
curl -s -d compilation_level=SIMPLE_OPTIMIZATIONS -d output_format=text -d output_info=compiled_code --data-urlencode "js_code@js/ppbridge.js" http://closure-compiler.appspot.com/compile > js/ppbridge.min.js

curl -s -d compilation_level=SIMPLE_OPTIMIZATIONS -d output_format=text -d output_info=compiled_code --data-urlencode "js_code@js/ppbridge.base.js" http://closure-compiler.appspot.com/compile > js/ppbridge.base.min.js

curl -s -d compilation_level=SIMPLE_OPTIMIZATIONS -d output_format=text -d output_info=compiled_code --data-urlencode "js_code@js/ppbridge.core.js" http://closure-compiler.appspot.com/compile > js/ppbridge.core.min.js

curl -s -d compilation_level=SIMPLE_OPTIMIZATIONS -d output_format=text -d output_info=compiled_code --data-urlencode "js_code@js/ppbridge.generic.js" http://closure-compiler.appspot.com/compile > js/ppbridge.generic.min.js

curl -s -d compilation_level=SIMPLE_OPTIMIZATIONS -d output_format=text -d output_info=compiled_code --data-urlencode "js_code@js/ppbridge.android.js" http://closure-compiler.appspot.com/compile > js/ppbridge.android.min.js

curl -s -d compilation_level=SIMPLE_OPTIMIZATIONS -d output_format=text -d output_info=compiled_code --data-urlencode "js_code@js/ppbridge.ios.js" http://closure-compiler.appspot.com/compile > js/ppbridge.ios.min.js


git commit -m "updating js-min to `date` version" js/ppbridge.min.js js/ppbridge.base.min.js js/ppbridge.core.min.js js/ppbridge.generic.min.js js/ppbridge.android.min.js js/ppbridge.ios.min.js
