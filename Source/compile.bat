::--compilation_level
::WHITESPACE_ONLY
::SIMPLE_OPTIMIZATIONS
::ADVANCED_OPTIMIZATIONS

java -jar ..\..\compiler.jar --js frameworks\gizmo-0.2.2.js --js armlib.js --compilation_level WHITESPACE_ONLY --formatting pretty_print --language_in ECMASCRIPT5 --js_output_file ..\armlib-0.0.1.js

pause