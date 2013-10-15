describe("PPBridge Test Core Module", function(){
	it("Test init Method", function(){
		expect($.NativeBridge.init).toEqual(jasmine.any(Function));
	});
	
	it("Test getResult Method", function(){
		expect($.NativeBridge.getResult).toEqual(jasmine.any(Function));
	});
	
	it("Test callHandler Method", function(){
		expect($.NativeBridge.callHandler).toEqual(jasmine.any(Function));
	});
	
	it("Test getAction Method", function(){
		expect($.NativeBridge.getAction).toEqual(jasmine.any(Function));
	});
	
	it("Test call Method", function(){
		expect($.NativeBridge.call).toEqual(jasmine.any(Function));
	});
	
	it("Test Setup PPBridge execute", function(){
		expect($.NativeBridge.execute).toEqual(jasmine.any(Function));
	});
});



describe("PPBridge Test Functionality", function(){
	// setup the genericDevice as an object
	window.ppIOS = {};
	window.ppAndroid = {
		methodCall : function(name, args){
			console.log(name + args);
		}
	}
	
	var merchantConfig = {
		actions : {
			"JambaJuiceTitleBar" : {
				func : "SetTitleBar",
				args : {
					Title : "Jamba Juice",
					LeftButton : {
						text : "Back",
						type : "BACK",
						tag  : 1
					},
					RightButton : {
						text : "Details",
						type : "ORDINARY",
						tag  : 2
					}
				}
			},
			"PlaceOrder" : {
				func : "ShowActionSheet",
				args : {
					Title : "Please Confirm",
					buttons : [
						{text : "Place Order", type : "DESTRUCTIVE"},
						{text : "CANCEL", type : "CANCEL"}
					]
				},
				cb : function(index){
					if(index.data==0){
						alert("You have placed your order");
					}
					else {
						alert("cancel");
					}
				}
			} 
		},
		handlers : {
			1 : function(e){
				$.NativeBridge.call({func:"DismissWebView"});
			},
			2 : function(e){
				$.NativeBridge.call({func:"ShowMerchantDetails"});
			}
		}
	}
	
	// setup
	beforeEach(function(){
		$.NativeBridge.init(merchantConfig); 
	});
	
	// teardown
	afterEach(function(){
		//PPBridge.setup(bridgeConfiguration);
	});

		

			
	it("Test Set Multiple Dynamic Actions with 110 ms time interval", function(){
		var i = 0;
			interval = undefined;
			
			waits(function(){
				expect(Object.keys(JSON.parse(PPBridge.getAction("*"))).length).toEqual(1);
			},30);
			
			
			clearInterval(interval);
			
			interval = setInterval(function(){
				if (i<10){
					i = i + 1;
					waits(function(){
						expect(PPBridge.call(actionToSetTitleBar)).toEqual("jsr://SetTitleBar/ActionToSetTitleBar");
						expect(Object.keys(JSON.parse(PPBridge.getAction("*"))).length).toEqual(i+1);
					}, 30);

				}
				else {
					clearInterval(interval);
				}
			},110);
	});
	
	it("Test Set Multiple Dynamic Actions without time interval", function(){
		var i;
		
		for(i=0; i<10; i++){
			console.log("testing " + i);
			$.NativeBridge.call({
				func : "SetTitleBar",
				args : {
					Title : "TestingHere",
					NavBarType : 1
				},
				cb : "setHeader"
			});
		}

		waits(function(){
			expect(Object.keys(JSON.parse($.NativeBridge.getAction("*"))).length).toEqual(11);
		}, 15000);

	});
		
});
