# IPG.CarMaker_OpenSCENARIO_Framework

## 1. Mục Tiêu Dự Án

`IPG.CarMaker_OpenSCENARIO_Framework` là framework xây dựng pipeline tự động cho CarMaker, bắt đầu từ các file OpenSCENARIO `.xosc` được tạo thủ công hoặc sinh từ generator, sau đó tự động scan, tự động convert thành CarMaker TestRun, và cuối cùng tạo Test Series để chạy automation testing bằng CarMaker Test Manager.

Tài liệu này giả định root project thực tế theo các script hiện có:

```text
C:\CM_Projects\ADAS_Demo1
```

Trong mọi lệnh và path bên dưới, `Root` được hiểu là:

```text
Root = C:\CM_Projects\ADAS_Demo1
```

## 2. Cơ Sở Lý Thuyết

Trong workflow thủ công của CarMaker, người dùng có thể import từng file `.xosc` bằng GUI để tạo TestRun. Cách này phù hợp khi debug một case riêng lẻ, nhưng không phù hợp khi dự án có hàng chục, hàng trăm, hoặc hàng nghìn scenario cần regression lặp lại.

Framework này tách quy trình thành bốn phase:

1. **Create manual / generate `.xosc`**

   Scenario được mô tả bằng OpenSCENARIO. Trong dự án này, dữ liệu ADAS nằm ở:

   ```text
   Root\Data\OpenSCENARIO
   ```

   Với ACC, source `.xosc` hiện tại nằm ở:

   ```text
   Root\Data\OpenSCENARIO\Scenarios\longitudinal_feature\ACC
   ```

2. **Auto scan source `.xosc`**

   Script scan toàn bộ cây scenario, đếm số lượng file, lấy metadata như `case_id`, `feature_domain`, `function_name`, entity count, multi-TV flag, rồi ghi vào manifest CSV.

3. **Auto convert `.xosc` thành CarMaker TestRun**

   Dùng converter chính thức của CarMaker:

   ```text
   C:\IPG\carmaker\win64-15.1\bin\osc2cm.exe
   ```

   Converter biến OpenSCENARIO thành TestRun trong:

   ```text
   Root\Data\TestRun\OSC_Imported\<feature_domain>\<function>\<case_id>
   ```

4. **Automation testing với Test Manager**

   Script sinh TCL cho CarMaker Script Control. TCL tạo Test Series và chạy các TestRun đã import. Test Manager không chạy `.xosc` trực tiếp; Test Manager chạy TestRun/Test Series.

## 3. Bài Toán Đặt Ra

### 3.1 Làm sao tự động scan có bao nhiêu file `.xosc`?

Nếu import bằng GUI, người dùng phải tự tìm từng file. Framework thay bước đó bằng manifest:

```text
Root\Data\Misc\OSC_Automation\xosc_manifest.csv
```

Manifest chứa:

```text
case_id
feature_domain
function_name
source_xosc_abs
source_xosc_rel
work_xosc_rel
output_testrun
entity_count
non_ego_entity_count
is_multi_tv
enabled
```

Với bộ ACC hiện tại, pipeline scan được 19 case, trong đó có các case multi-TV như `TV1`, `TV2`.

### 3.2 Làm sao auto convert thay vì import case-by-case bằng GUI?

Dùng `osc2cm.exe` theo batch. Script đọc manifest, copy từng `.xosc` sang working folder, patch lỗi reference nếu cần, rồi gọi converter với các option ổn định.

Output TestRun giữ đúng cấu trúc source:

```text
Root\Data\TestRun\OSC_Imported\longitudinal_feature\ACC\acc_csc_001
Root\Data\TestRun\OSC_Imported\longitudinal_feature\ACC\acc_csc_002
...
```

GUI chỉ nên dùng để verify random case sau khi batch convert.

### 3.3 Làm sao ánh xạ các namedValue signal / parameter?

OpenSCENARIO khai báo parameter trong:

```xml
<ParameterDeclarations>
  <ParameterDeclaration name="EgoSpeed" parameterType="double" value="15"/>
  <ParameterDeclaration name="TVSpeed" parameterType="double" value="10"/>
</ParameterDeclarations>
```

Khi convert, script dùng:

```powershell
--mapparam
```

Mục tiêu là để `osc2cm` map ParameterDeclarations sang NValue/parameter trong TestRun, tạo nền tảng cho TestMgr Variation. Chỉ những parameter được map thật trong generated TestRun mới nên được dùng trong variation.

Cách kiểm tra:

```powershell
Select-String `
  -Path "Root\Data\TestRun\OSC_Imported\longitudinal_feature\ACC\*" `
  -Pattern "EgoSpeed|TVSpeed|TV1Speed|TV2Speed|NValue|Parameter" `
  -Context 0,2
```

### 3.4 Làm sao Test Series auto detect các file TestRun?

Script 04 đọc:

```text
Root\Data\Misc\OSC_Automation\import_report.csv
```

Chỉ các row có `status = OK` mới được đưa vào Test Series. Sau đó script generate TCL vào:

```text
Root\Data\Script\OSC_Automation
```

Khi chạy TCL trong CarMaker Script Control, Test Manager tự tạo Test Series từ danh sách TestRun đã convert.

## 4. Phương Án Giải Quyết

Pipeline chính thức hiện tại gồm 4 script:

```text
Root\tools\osc_batch\01_scan_xosc.ps1
Root\tools\osc_batch\02_batch_osc2cm_import.ps1
Root\tools\osc_batch\03_patch_testruns.ps1
Root\tools\osc_batch\04_generate_testmgr_tcl.ps1
```

Flow:

```text
OpenSCENARIO .xosc
  -> 01_scan_xosc.ps1
  -> xosc_manifest.csv
  -> 02_batch_osc2cm_import.ps1
  -> CarMaker TestRun + import_report.csv
  -> 03_patch_testruns.ps1
  -> cleaned TestRun
  -> 04_generate_testmgr_tcl.ps1
  -> TestMgr TCL
  -> CarMaker Script Control
  -> Test Series / automation regression
```

### 4.1 Script 01 - Scan XOSC

File:

```text
Root\tools\osc_batch\01_scan_xosc.ps1
```

Mục đích:

- Scan toàn bộ `.xosc` trong:

  ```text
  Root\Data\OpenSCENARIO\Scenarios\longitudinal_feature\ACC
  ```

- Bỏ qua `.venv`, `__pycache__`, `Templates`, `Catalogs`.
- Lấy `case_id` từ folder case hoặc tên file.
- Đọc `<ScenarioObject name="...">` để đếm entity.
- Phân loại case multi-TV nếu số non-Ego entity lớn hơn 1.
- Tạo manifest:

  ```text
  Root\Data\Misc\OSC_Automation\xosc_manifest.csv
  ```

Chạy từ PowerShell tại Root:

```powershell
cd C:\CM_Projects\ADAS_Demo1
powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\01_scan_xosc.ps1"
```

Chạy từ cmd tại Root:

```cmd
cd /d C:\CM_Projects\ADAS_Demo1
powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\01_scan_xosc.ps1"
```

Output quan trọng:

```text
Root\Data\Misc\OSC_Automation\xosc_manifest.csv
```

### 4.2 Script 02 - Batch Convert XOSC to TestRun

File:

```text
Root\tools\osc_batch\02_batch_osc2cm_import.ps1
```

Mục đích:

- Đọc `xosc_manifest.csv`.
- Clear report/log/work folder cũ.
- Copy source `.xosc` sang working-copy:

  ```text
  Root\Data\Misc\OSC_Automation\_work_xosc\<feature_domain>\<function>\<case_id>
  ```

- Không sửa source `.xosc` gốc.
- Patch working-copy nếu gặp reference lỗi `Bus`.
- Gọi `osc2cm.exe` để convert sang TestRun.
- Ghi report:

  ```text
  Root\Data\Misc\OSC_Automation\import_report.csv
  ```

Option converter chính:

```powershell
-p "C:\CM_Projects\ADAS_Demo1"
-o "<working_xosc_relative_path>"
-t "OSC_Imported\<feature_domain>\<function>\<case_id>"
-e "Ego"
--validate
--oscversion 130
--mapparam
--trfmobj
--trfendmode 2
--defaultman 99999.0
--logtofile
--logtoconsole
--loglevel 4
```

Ý nghĩa các option quan trọng:

- `-e "Ego"`: bắt buộc giữ Ego là ego vehicle. Nếu bỏ, converter có thể biến toàn bộ entity thành traffic object.
- `--mapparam`: map ParameterDeclarations thành named values/NValue nếu converter hỗ trợ.
- `--trfmobj`: cho phép converter tự chọn traffic model/object cho TV, TV1, TV2.
- `--trfendmode 2`: cấu hình end mode cho traffic.
- `--defaultman 99999.0`: thêm default maneuver để tránh lỗi Ego không có maneuver (`nMan = 0`).
- Không dùng `-i` nếu Ego Vehicle InfoFile đã được quản lý bởi project/SimParameter.
- Không add FMU/controller vào TestRun.

Chạy từ PowerShell tại Root:

```powershell
cd C:\CM_Projects\ADAS_Demo1
powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\02_batch_osc2cm_import.ps1"
```

Chạy từ cmd tại Root:

```cmd
cd /d C:\CM_Projects\ADAS_Demo1
powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\02_batch_osc2cm_import.ps1"
```

Output quan trọng:

```text
Root\Data\TestRun\OSC_Imported\longitudinal_feature\ACC\<case_id>
Root\Data\Misc\OSC_Automation\import_report.csv
Root\Data\Misc\OSC_Automation\logs\osc2cm
```

### 4.3 Script 03 - Cleanup Duplicate FMU in TestRuns

File thực tế:

```text
Root\tools\osc_batch\03_patch_testruns.ps1
```

Lý do cần script 03:

Project đã cấu hình `CM_ACCController_V17` trong:

```text
Root\SimInput\Settings\SimParameter
```

Nếu generated TestRun cũng include lại:

```text
GenericPlugin.CM_ACCController_V17.*
FMU.Logging.ToFile
```

CarMaker có thể báo lỗi:

```text
Model CM_ACCController_V17: Can only be included once,
included in InfoFile "SimParameter" and "TestRun".
```

Script 03 làm gì:

- Đọc manifest và import report.
- Chỉ xử lý case import OK.
- Backup TestRun trước khi cleanup vào:

  ```text
  Root\Data\Misc\OSC_Automation\_backup_testrun_before_fmu_cleanup
  ```

- Remove old automation block nếu tồn tại.
- Remove các dòng:

  ```text
  GenericPlugin.CM_ACCController_V17.*
  Plugin.CM_ACCController_V17.*
  FMU.Logging.ToFile
  ```

- Không add config FMU mới.
- Không sửa `SimParameter`.
- Ghi report:

  ```text
  Root\Data\Misc\OSC_Automation\cleanup_duplicate_fmu_report.csv
  ```

Chạy từ PowerShell tại Root:

```powershell
cd C:\CM_Projects\ADAS_Demo1
powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\03_patch_testruns.ps1"
```

Chạy từ cmd tại Root:

```cmd
cd /d C:\CM_Projects\ADAS_Demo1
powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\03_patch_testruns.ps1"
```

### 4.4 Script 04 - Generate Test Manager TCL

File:

```text
Root\tools\osc_batch\04_generate_testmgr_tcl.ps1
```

Mục đích:

- Đọc:

  ```text
  Root\Data\Misc\OSC_Automation\import_report.csv
  ```

- Chỉ lấy các TestRun import OK.
- Kiểm tra TestRun file tồn tại.
- Group theo `feature_domain/function_name`.
- Xóa TCL cũ trong:

  ```text
  Root\Data\Script\OSC_Automation
  ```

- Generate TCL để tạo và run Test Series.

Output TCL:

```text
Root\Data\Script\OSC_Automation\00_generate_all_testseries.tcl
Root\Data\Script\OSC_Automation\00_run_all_testseries.tcl
Root\Data\Script\OSC_Automation\01_generate_longitudinal_feature_ACC_testseries.tcl
Root\Data\Script\OSC_Automation\02_run_longitudinal_feature_ACC_testseries.tcl
```

Test Series output:

```text
Root\Data\TestRun\OSC_Imported\longitudinal_feature\ACC\ACC_OSC_Regression.ts
```

Chạy PowerShell script từ Root:

```powershell
cd C:\CM_Projects\ADAS_Demo1
powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\04_generate_testmgr_tcl.ps1"
```

Chạy từ cmd tại Root:

```cmd
cd /d C:\CM_Projects\ADAS_Demo1
powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\04_generate_testmgr_tcl.ps1"
```

Sau đó mở CarMaker Script Control và chạy:

```tcl
source Data/Script/OSC_Automation/00_generate_all_testseries.tcl
source Data/Script/OSC_Automation/00_run_all_testseries.tcl
```

Hoặc chạy riêng ACC:

```tcl
source Data/Script/OSC_Automation/01_generate_longitudinal_feature_ACC_testseries.tcl
source Data/Script/OSC_Automation/02_run_longitudinal_feature_ACC_testseries.tcl
```

## 5. Lệnh Chạy Full Pipeline

Mở PowerShell tại Root:

```powershell
cd C:\CM_Projects\ADAS_Demo1

powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\01_scan_xosc.ps1"
powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\02_batch_osc2cm_import.ps1"
powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\03_patch_testruns.ps1"
powershell -ExecutionPolicy Bypass -File ".\tools\osc_batch\04_generate_testmgr_tcl.ps1"
```

Sau đó trong CarMaker Script Control:

```tcl
source Data/Script/OSC_Automation/00_generate_all_testseries.tcl
source Data/Script/OSC_Automation/00_run_all_testseries.tcl
```

## 6. Cấu Trúc Thư Mục

Tổng quan cấu trúc root:

```text
Root
|-- bin
|-- Data
|   |-- Config
|   |-- Misc
|   |   `-- OSC_Automation
|   |-- OpenSCENARIO
|   |   |-- Adapters
|   |   |-- Catalogs
|   |   |-- Core
|   |   |-- DATA_sample
|   |   |-- Expander
|   |   |-- Logical
|   |   |-- MAP_sample
|   |   |-- Parameters
|   |   |-- Scenarios
|   |   `-- Templates
|   |-- Road
|   |-- Script
|   |   `-- OSC_Automation
|   |-- TestRun
|   |   `-- OSC_Imported
|   |-- Vehicle
|   `-- ...
|-- SimInput
|   `-- Settings
|       `-- SimParameter
|-- tools
|   `-- osc_batch
`-- summary_ScriptControl.md
```

## 7. Tổng Quan Mỗi Thư Mục

### 7.1 `Data\OpenSCENARIO`

Đây là source layer của OpenSCENARIO framework.

- `Logical`: mô tả logic scenario ở mức abstract, ví dụ actor, pre-condition, maneuver type.
- `Parameters`: khai báo parameter set và constraint để expand logical scenario thành concrete core case.
- `Core`: kết quả expand từ `Logical + Parameters`. Mỗi file core chứa logic gốc và một bộ parameter cụ thể.
- `Templates`: storyboard template và maneuver block `.xosc`.
- `Scenarios`: `.xosc` hoàn chỉnh được sinh từ core + templates. Đây là input cho `osc2cm`.
- `Catalogs`: vehicle, controller, pedestrian, trajectory catalog cho OpenSCENARIO.
- `MAP_sample`: map `.xodr` dùng bởi OpenSCENARIO.
- `DATA_sample`: bộ data sample cho variation, ví dụ `acc_dsp_001.yaml`.
- `Expander`: script expand logical YAML thành core YAML.
- `Adapters`: converter từ core YAML sang target format, hiện có `Adapters\carla` để sinh `.xosc` theo template.

Liên kết:

```text
Logical + Parameters
  -> Expander
  -> Core
  -> Adapters/Templates/Catalogs/MAP_sample
  -> Scenarios (*.xosc)
```

### 7.2 `tools\osc_batch`

Chứa pipeline batch automation cho CarMaker:

```text
01_scan_xosc.ps1
02_batch_osc2cm_import.ps1
03_patch_testruns.ps1
04_generate_testmgr_tcl.ps1
```

Thư mục này là automation layer giữa `.xosc` và CarMaker TestRun/Test Manager.

### 7.3 `Data\Misc\OSC_Automation`

Generated workspace của pipeline:

- `xosc_manifest.csv`: output của script 01.
- `_work_xosc`: working-copy `.xosc` cho script 02.
- `import_report.csv`: status convert của script 02.
- `cleanup_duplicate_fmu_report.csv`: report của script 03.
- `_backup_testrun_before_fmu_cleanup`: backup TestRun trước cleanup.
- `logs\osc2cm`: log converter theo từng case.

Đây là generated data, có thể recreate bằng pipeline.

### 7.4 `Data\TestRun\OSC_Imported`

Nơi chứa CarMaker TestRun được convert từ `.xosc`.

Ví dụ:

```text
Data\TestRun\OSC_Imported\longitudinal_feature\ACC\acc_csc_001
```

Đây là input trực tiếp cho Test Manager.

### 7.5 `Data\Script\OSC_Automation`

Nơi chứa TCL generated cho CarMaker Script Control:

```text
00_generate_all_testseries.tcl
00_run_all_testseries.tcl
01_generate_longitudinal_feature_ACC_testseries.tcl
02_run_longitudinal_feature_ACC_testseries.tcl
```

TCL đọc TestRun path đã convert và tạo/chạy Test Series.

### 7.6 `SimInput\Settings\SimParameter`

Quản lý cấu hình simulation/project-level. Theo summary hiện tại, FMU/controller `CM_ACCController_V17` đã được include ở đây. Vì vậy TestRun generated không nên include lại FMU để tránh duplicate.

### 7.7 `Data\Vehicle`, `Data\Road`, `Data\Config`

Là các thư mục project data của CarMaker:

- `Vehicle`: vehicle InfoFile.
- `Road`: road database / road file CarMaker.
- `Config`: cấu hình simulation và controller liên quan.

Pipeline hiện tại không sửa trực tiếp các thư mục này, nhưng TestRun generated có thể reference đến chúng thông qua project config.

## 8. Kết Luận

### 8.1 Điểm Mạnh So Với Manual GUI

- Tự động scan số lượng `.xosc`, không cần đếm/tìm bằng tay.
- Convert hàng loạt bằng `osc2cm`, không import từng case trong GUI.
- Giữ output có cấu trúc rõ ràng theo `feature_domain/function/case_id`.
- Có manifest và report để trace case nào OK/FAIL.
- Có working-copy nên có thể patch lỗi convert mà không sửa source `.xosc` gốc.
- Hỗ trợ multi-TV tốt hơn so với workflow manual dễ sai assumption single-TV.
- Tự động tạo Test Manager TCL, giảm thao tác tạo Test Series bằng tay.
- Giảm rủi ro duplicate FMU bằng bước cleanup TestRun.
- Tạo nền tảng cho variation bằng `--mapparam` và `DATA_sample`.

### 8.2 Điểm Yếu / Giới Hạn

- Phụ thuộc vào `osc2cm.exe` và version CarMaker 15.1.
- Mapping parameter sang NValue cần verify trên generated TestRun; không nên đoán tên parameter.
- Script hiện tại hard-code root:

  ```text
  C:\CM_Projects\ADAS_Demo1
  ```

- Scope scan hiện tại đang tập trung vào:

  ```text
  longitudinal_feature\ACC
  ```

- Nếu source `.xosc` có reference entity sai, pipeline phải patch working-copy theo rule riêng.
- TestRun generated vẫn cần verify random trong CarMaker để đảm bảo converter mapping đúng với expectation.
- Variation chưa được generate full tự động thành TestMgr Variation; hiện mới có nền tảng data sample và `--mapparam`.

## 9. Hướng Phát Triển

1. Parameterize root project cho 4 script thay vì hard-code `C:\CM_Projects\ADAS_Demo1`.
2. Mở rộng scan cho tất cả feature/function:

   ```text
   longitudinal_feature\ACC
   brake_feature\AEB
   lateral_feature\LKA
   parking_feature\...
   ```

3. Thêm script validate generated TestRun để check:

   ```text
   EgoSpeed / TVSpeed / TV1Speed / TV2Speed
   NValue
   Parameter
   ```

4. Tạo generator cho TestMgr Variation từ:

   ```text
   Data\OpenSCENARIO\DATA_sample\<feature_domain>\<function>\*_dsp_*.yaml
   ```

5. Chuẩn hóa schema data sample để tách:

   ```text
   fixed_values
   variation_values
   constraints
   expected_gap_at_trigger
   ```

6. Sinh report HTML/CSV gồm:

   ```text
   source_xosc
   working_xosc
   output_testrun
   import_status
   cleanup_status
   testseries_status
   ```

7. Thêm pre-check OpenSCENARIO source trước khi convert:

   - XML parse.
   - Ego entity exists.
   - ScenarioObject references valid.
   - ParameterDeclarations complete.

8. Hỗ trợ parallel convert khi số lượng scenario lớn.
9. Đồng bộ framework OpenSCENARIO generator với CarMaker output để một case có thể đi từ logical YAML đến Test Manager regression mà không cần thao tác GUI.

## 10. Nguyên Tắc Vận Hành

- Source `.xosc` trong `Data\OpenSCENARIO\Scenarios` là source of truth cho converter; không patch trực tiếp source khi batch import.
- `Data\Misc\OSC_Automation` là generated workspace; có thể xóa và sinh lại.
- `Data\TestRun\OSC_Imported` là output của converter; nên regenerate bằng script thay vì sửa tay hàng loạt.
- FMU/controller project-level nằm trong `SimParameter`; TestRun generated không nên include lại.
- Test Manager chạy TestRun/Test Series, không chạy `.xosc` trực tiếp.
- Variation chỉ nên dựa trên parameter đã map thật trong generated TestRun.
