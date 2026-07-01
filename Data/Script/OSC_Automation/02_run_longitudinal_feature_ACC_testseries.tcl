Log "=== Run longitudinal_feature/ACC OSC Test Series ==="
TestMgr load "OSC_Imported/longitudinal_feature/ACC/ACC_OSC_Regression.ts"
TestMgr clearresults
TestMgr start
Log "TestMgr Status: [TestMgr get Status]"
Log "TestMgr Result: [TestMgr get Result]"
