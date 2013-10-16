PayPalClientBridge
==================

The PayPalClientBridge provides the capability for a web application (HTML/CSS/JS) embedded in a WebView in the PayPal Apps (Wallet and Here) for iOS and Android to communicate and request for a limited resource or native UI to be displayed and can be acted upon by a user.


Here's a sample images on the integration of the PayPal Wallet App with Jamba Juice

![Screen shots](https://raw.github.com/paypal/PayPalClientBridge/img/JambaJuice.png)


Author
======

  Everett P. Quebral <equebral@paypal.com>


Repository
==========

  https://github.paypal.com/PayPalClientBridge


How To Use
==========

  Include the js/ppbridge.base.js to your page
  
  Initialize the bridge by calling PayPalApp.init(bridgeConfig)
  
  Call the Bridge as needed -> PayPalApp.call("MerchantTitleBar")


