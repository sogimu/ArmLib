::--compilation_level
::WHITESPACE_ONLY
::SIMPLE_OPTIMIZATIONS
::ADVANCED_OPTIMIZATIONS

java -jar .\compiler.jar --js frameworks\gizmo-0.2.2.js --js modules\ArmLib\ArmLib.js --js modules\Object\class\superObj.js --js modules\Shapes\class\Shape.js --js modules\Object\Object.js --js modules\Layer\Layer.js --js modules\Shapes\Rect.js --js modules\Shapes\Image.js --compilation_level WHITESPACE_ONLY --formatting pretty_print --language_in ECMASCRIPT5 --js_output_file ..\armlib-0.0.1.js

pause