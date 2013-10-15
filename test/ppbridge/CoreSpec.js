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
	
	it("Test getResource Method", function(){
		expect(PPBridge.getResource).toEqual(jasmine.any(Function));
	});
	
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
	window.genericDevice = {};
	
	var actionToSetTitleBar,
		setHeaderCallback,
		testResource,
		testHandlers,
		bridgeConfiguration;
		
	// setup	
	beforeEach(function(){
		actionToSetTitleBar = {
			func : "SetTitleBar",
			args : {
				Title : "TestingHere",
				LeftButton : {
					text : "Back",
					type : "BACK",
					tag : 1
				},
				RightButton : {
					text : "Leave",
					type : "BACK",
					tag : 2
				}
			}
		};
		
		setHeaderCallback = function(obj){
			console.log("callback - setHeader ", obj);
		};
		
		testResource = function(obj){
			return "test here";
		};

		testHandlers = {
			1 : function(e){
				return true;
			},
			2 : function(e){
				return true;
			}
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
			},
			handlers : testHandlers
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
		expect(genericDevice.methodCall).toEqual(jasmine.any(Function));
	});
			
	it("Test getAction", function(){
		waits(function(){
			expect(PPBridge.getAction("ActionToSetTitleBar")).toEqual(JSON.stringify(actionToSetTitleBar));
		},30);
	});
	
	it("Test JSR call", function(){
		waits(function(){
			expect(PPBridge.call({
				func : "SetTitleBar",
				args : {
					Title : "TestingHere"
				}
			})).toEqual("jsr://SetTitleBar/0");
		},30);

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
		

	// set the header with the left and right buttons, simulate the click to the left and right button
	it("Test Set Header, Left Button and Right Button", function(){
		PPBridge.setup(bridgeConfiguration);
		waits(function(){
			PPBridge.call({
				func : "SetTitleBar",
				args : {
					Title : "TestingHere",
					LeftButton : {
						text : "Back",
						type : "BACK",
						tag : 1
					},
					RightButton : {
						text : "Leave",
						type : "BACK",
						tag : 2
					}
				}
			});
			expect(PPBridge.callHandler(1)).toEqual('true');
			expect(PPBridge.callHandler(2)).toEqual('true');
		}, 100);
	});

	it("Test Set Header, Left Button and Right Button - Falsity test", function(){
		PPBridge.setup(bridgeConfiguration);
		waits(function(){
			PPBridge.call({
				func : "SetTitleBar",
				args : {
					Title : "TestingHere",
					LeftButton : {
						text : "Back",
						type : "BACK",
						tag : 1
					},
					RightButton : {
						text : "Leave",
						type : "BACK",
						tag : 2
					}
				}
			});
			expect(PPBridge.callHandler(3)).toEqual('false');
			expect(PPBridge.callHandler(4)).toEqual('false');
		},100);
	});
});
