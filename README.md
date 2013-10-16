PayPalClientBridge
==================

The PayPalClientBridge provides the capability for a web application (HTML/CSS/JS) embedded in a WebView in the PayPal Apps (Wallet and Here) for iOS and Android to communicate and request for a limited resource or native UI to be displayed and can be acted upon by a user.


Here's a sample images on the integration of the PayPal Wallet App with Jamba Juice

![Screen shots](https://raw.github.com/paypal/PayPalClientBridge/master/img/JambaJuice.png)


Author
======

  Everett P. Quebral <equebral@paypal.com>


Repository
==========

  https://github.paypal.com/PayPalClientBridge


### Table of Contents

- [Overview](#overview)
- [Integration](#integration)
	- [Requirements](#requirements)
	- [Initial Setup](#initial-setup)
- [Tests](#tests)



Overview
--------

* The PayPalClientBridge...
	1.  A JavaScript library that bridges the native app (iOS/Android) and the Web Application (HTML/CSS/JS) for communication.
	2.  It can send payload or data back and forth, from native to web and vice versa
	3.  Enables the Web Application to request for a native UI as instead of displaying a web UI.

* The PayPal App
	1.  PayPal Wallet App
	2.  PayPal Here App

* Your App
	1.  Third party merchant web application that the PayPal Wallet App displayes in an embedded web browser.
	2.  For Order Early applications that will receive order ahead of time by using the PayPal Wallet App


Integration
-----------

### Requirements

* PayPal Wallet/Here App
* SSL Web hosting
* PayPal Here Merchant


### Initial Setup

1. Include the ppbridge.js or ppbridge.min.js from the js folder in your markup

	```html
	<script src="/js/ppbridge.js"></script>
	```

2.  Include the bridge configuration, below is a sample bridge configuration object

	```js
	var PayPalApp = $.NativeBridge,
	bridgeConfig = {
		actions : {
			/**
			 * action for displaying the AlertView in the PayPal Client App
			 */
			"MaxOrderReached" : {
				func : "ShowAlert", 
				args : { 
					title : "Your Cart Is Full", 
					message : "You can add up to 7 items to an order. If you have more, please place another order for the remaining items.", 
					buttons : [{text : "OK", style :{}, type : "CANCEL" }]
				}
			},
			/**
			 * action for setting the TitleBar, Left Button (Back), the Right Button is disregarded because the PayPal Client App controls it
			 * when the back button is clicked, the PayPal Client App will call handler tag 3
			 */
			"MerchantTitleBar" : {
				func : "SetTitleBar",
				args : {
					WindowTitle : window.document.title,
					LeftButton : {
						text : "Back",
						type : "BACK",
						tag  : 3
					}
				}
			},
			/**
			 * action for setting the TitleBar, Left Button (Back), Right Button is disregarded because the PayPal Client App controls it.
			 * when the back button is clicked, tha PayPal Client App will call handler tag 1
			 */
			"MerchantTitleBarBackToPP" : {
				func : "SetTitleBar",
				args : {
					WindowTitle : window.document.title,
					LeftButton : {
						text : "Back",
						type : "BACK",
						tag  : 1
					}
				}
			},
			/**
			 * action for setting the TitleBar, Left Button (Back)
			 * additional setting is applied to the back button as it is disabled, it is being shown in PayPal Client App but not clickable
			 */
			"MerchantTitleBarDisabledBack" : {
				func : "SetTitleBar",
				args : {
					WindowTitle : window.document.title,
					LeftButton : {
						text : "Back",
						type : "BACK",
						style : {disabled:true},
						tag  : 1
					}
				}
			},
			/**
			 * action for setting the TitleBar, Left Button (Back), Right Button is disregarded because the PayPal Client App controls it.
			 * when the back button is clicked, tha PayPal Client App will call handler tag 3
			 */
			"MerchantTabTitleBar" : {
			  func : "SetTitleBar",
				args : {
					WindowTitle : window.document.title,
					LeftButton : {
						text : "Back",
						type : "BACK",
						tag  : 3
					}
				}
			},
			/**
			 * action to display the ActionSheet on the PayPal Client App
			 * when a button is clicked, the PayPal Client App will execute the callback handler function "PlaceOrderCB" in the callbacks object.
			 */
			"PlaceOrder" : {
				func : "ShowActionSheet",
				args : {
					title : "Please Confirm",
					buttons : [
						{text : "Place order", type : "DESTRUCTIVE"},
						{text : "CANCEL", type : "CANCEL"}
					]
				},
				cb : "PlaceOrderCB"
			},
			/**
			 * action to direct the PayPal Client App to go to the native page
			 */
			"GotoCheckinPage" : {
				func : "GotoPage",
				args : { page : "CheckIn" }
			}
		},
		handlers : {
			1 : function(e){
				PayPalApp.call({func:"DismissWebView"});
			},
			2 : function(e){
				PayPalApp.call({
					func:"GotoPage",
					args : { page : "MerchantDetailsPage"}
				});
			},
			3 : function(e){
			  window.history.back();
			}
		},
		callbacks : {
			"PlaceOrderCB" : function(index){
				if (index.data == 0){
					PayPalApp.call("GotoCheckinPage");
				}
			}
		}
	};
	```

3.  Initialize the bridge and pass the bridge configuration object

	```js
	PayPalApp.init(bridgeConfig)
	```

4.  Call the actions as needed, actions are defined on the bridgeConfig

	```js
	PayPalApp.call("MerchantTitleBar");
	```


### Tests

* Run test/SpecRunnerBaseTest.html to see if the library is working properly

