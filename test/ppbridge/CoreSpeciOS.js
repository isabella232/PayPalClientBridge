describe("PPBridge Test Core Module", function(){
	it("Test init Method", function(){
		expect(PPBridge.init).toEqual(jasmine.any(Function));
	});
	
	it("Test getResult Method", function(){
		expect(PPBridge.getResult).toEqual(jasmine.any(Function));
	});
	
	it("Test callHandler Method", function(){
		expect(PPBridge.callHandler).toEqual(jasmine.any(Function));
	});
	
	// it("Test getResource Method", function(){
	// 		expect(PPBridge.getResource).toEqual(jasmine.any(Function));
	// 	});
	
	it("Test getAction Method", function(){
		expect(PPBridge.getAction).toEqual(jasmine.any(Function));
	});
	
	it("Test call Method", function(){
		expect(PPBridge.call).toEqual(jasmine.any(Function));
	});
	
	it("Test plugin Object", function(){
		expect(PPBridge.plugins).toEqual(jasmine.any(Object));
	});
});



describe("PPBridge Test Functionality", function(){
	// setup the genericDevice as an object
	window.ppIOS = {};
	
	var actionToSetTitleBar,
		setHeaderCallback,
		testResource,
		bridgeConfiguration;
		
	// setup	
	beforeEach(function(){
		actionToSetTitleBar = {
			func : "SetTitleBar",
			args : {
				Title : "TestingHere",
				NavBarType : 1
			},
			cb : "setHeader"
		};
		
		setHeaderCallback = function(obj){
			console.log("callback - setHeader ", obj);
		};
		
		testResource = function(obj){
			return "test here";
		};

		bridgeConfiguration = { 
			actions : {
				"ActionToSetTitleBar" : actionToSetTitleBar
			},
			callbacks: {
				'setHeader' : setHeaderCallback
			},
			resources: {
				'testResource' : testResource
			}
		};
		
		PPBridge.setup(bridgeConfiguration); 
	});
	
	// teardown
	afterEach(function(){
		//PPBridge.setup(bridgeConfiguration);
	});

		
	it("Test Setup PPBridge setup", function(){
		expect(PPBridge.setup).toEqual(jasmine.any(Function));
	});
	
	it("Test Setup PPBridge execute", function(){
		expect(PPBridge.execute).toEqual(jasmine.any(Function));
	});
	
	it("Test Setup Configuration", function(){
		PPBridge.setup(bridgeConfiguration);
	});
	
	it("Test MethodCall", function(){
		expect(ppIOS.methodCall).toEqual(jasmine.any(Function));
	});
			
	it("Test getAction", function(){
		expect(PPBridge.getAction("ActionToSetTitleBar")).toEqual(JSON.stringify(actionToSetTitleBar));
	});
	
	it("Test JSR call", function(){
		expect(PPBridge.call({
			func : "SetTitleBar",
			args : {
				Title : "TestingHere",
				NavBarType : 1
			},
			cb : "setHeader"
		})).toEqual("jsr://SetTitleBar/0");
	});
	
	it("Test Set Multiple Dynamic Actions with 110 ms time interval", function(){
		var i = 0;
			interval = undefined;
			
			expect(Object.keys(JSON.parse(PPBridge.getAction("*"))).length).toEqual(1);
			
			clearInterval(interval);
			
			interval = setInterval(function(){
				if (i<10){
					i = i + 1;
					expect(PPBridge.call(actionToSetTitleBar)).toEqual("jsr://SetTitleBar/ActionToSetTitleBar");
					expect(Object.keys(JSON.parse(PPBridge.getAction("*"))).length).toEqual(i+1);
				}
				else {
					clearInterval(interval);
				}
			},110);
	});
	
	it("Test Set Multiple Dynamic Actions without time interval", function(){
		var i;
		
		//runs(function(){
			for(i=0; i<10; i++){
				console.log("testing " + i);
				PPBridge.call({
					func : "SetTitleBar",
					args : {
						Title : "TestingHere",
						NavBarType : 1
					},
					cb : "setHeader"
				});
			}
		//});

		waits(function(){
			expect(Object.keys(JSON.parse(PPBridge.getAction("*"))).length).toEqual(11);
		}, 15000);
		
		// waitsFor(function(){
		// 			expect(Object.keys(JSON.parse(PPBridge.getAction("*"))).length).toEqual(11);
		// 		}, 110 * 10);
	});
		
});
