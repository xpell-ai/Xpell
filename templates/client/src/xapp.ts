import {
  _x,
  _xd,
  _xem,
  _xlog,
  _xu,
  XUI,
  XVM,
  type XObjectData
} from "xpell-ui";
import "./xtest.css";

async function main() {
  _x.verbose = true;             // display Xpell engine info
  _x.start();                    // start Xpell frame engine
  _x.loadModule(XUI);            // load XUI module

  // Create the main player div and attach to body
  XUI.createPlayer("xplayer");

  // ---------------------------------------------------------------------------
  // 1) Create an XVM container inside the player
  // ---------------------------------------------------------------------------
  const containerView: XObjectData = {
    _id: "root-container",
    _type: "view",
    class: "root-container",
    style: "width:100%;height:100%;",
  };

  const container = XUI.add(containerView);
  XVM.addContainer(container); // XVM will manage views inside this container

  // ---------------------------------------------------------------------------
  // 2) Your original big view (as one XVM-managed view)
  // ---------------------------------------------------------------------------
  const mainView: XObjectData = {
    _type: "view",
    _id: "main-view",
    class: "main-view",
    _children: [
      {
        _type: "view",
        _id: "header",
        class: "header",
        _children: [
          {
            _type: "label",
            _id: "logo",
            class: "logo",
            _text: "Xpell"
          },
          {
            _type: "view",
            _id: "frame-control",
            class: "frame-control",
            _children: [
              {
                _type: "label",
                _id: "frame-label",
                class: "header-label",
                _text: "Frame: 0",
                _on_frame: "set-text-from-frame pattern:'Frame: $data'"
              },
              {
                _type: "label",
                _id: "fps-label",
                class: "header-label",
                _text: "FPS: 0",
                _data_source: "fps",
                _on_data: "set-text-from-data pattern:'FPS: $data' empty:false"
              }
            ]
          }
        ]
      },
      {
        _type: "view",
        _id: "main-content",
        class: "main-content",
        _children: [
          {
            _type: "view",
            _id: "event-control",
            class: "event-control",
            _children: [
              {
                _type: "label",
                _text: "XUI",
              },
              {
                _id: "xui-om-objects",
                _type: "label",
                class: "",
                style: "",
                _text: "xui-om-objects",
                _data_source: "xui-om-objects",
                _on_data: "set-text-from-data empty:false pattern:'XUI OM Objects: $data'"
              },
              {
                _type: "label",
                class: "event-control-failure",
                _text: "mount event with _on property",
                _on: {
                  "mount": (xobj, event) => {
                    xobj.replaceClass("event-control-failure", "event-control-success");
                  }
                }
              },
              {
                _type: "view",
                class: "xflex",
                _id: "on_mount_check_box",
                _children: [
                  {
                    _type: "view",
                    class: "event-control-failure",
                    _id: "on_mount_check",
                    _text: "on_mount_check",
                    _on_mount: async (xobj, event) => {
                      xobj.replaceClass("event-control-failure", "event-control-success");
                      XUI.append({
                        _type: "label",
                        class: "event-control-failure",
                        _text: "mounted by on_mount_check_box",
                        _on_mount: async (xobj, event) => {
                          xobj.replaceClass("event-control-failure", "event-control-success");
                          console.log("mounted by on_mount_check_box");
                          await _x.delay(1000);
                        }
                      }, "on_mount_check_box");
                    },
                  }
                ]
              },
              {
                _type: "label",
                class: "event-control-failure",
                _text: "mount event with _once property",
                _once: {
                  "mount": (xobj, event) => {
                    xobj.replaceClass("event-control-failure", "event-control-success");
                  },
                  "click": (xobj, event) => {
                  }
                }
              },
              {
                _type: "label",
                class: "event-control-failure",
                _text: "_on_create",
                _on_create: (xobj, event) => {
                  xobj.replaceClass("event-control-failure", "event-control-success");
                }
              },
              {
                _type: "label",
                class: "event-control-failure",
                _text: "_on: create",
                _on: {
                  create: (xobj, event) => {
                    xobj.replaceClass("event-control-failure", "event-control-success");
                  }
                }
              },
              {
                _type: "label",
                class: "event-control-failure",
                _text: "_on_show",
                _on_show: (xobj, event) => {
                  xobj.replaceClass("event-control-failure", "event-control-success");
                }
              },
              {
                _type: "label",
                class: "event-control-failure",
                _text: "_on: show",
                _on: {
                  show: (xobj, event) => {
                    xobj.replaceClass("event-control-failure", "event-control-success");
                  }
                }
              },
              {
                _type: "label",
                class: "event-control-failure",
                _text: "_on: click",
                _on_mount: (xobj, event) => {
                  xobj.click();
                },
                _on_click: (xobj, event) => {
                  xobj.replaceClass("event-control-failure", "event-control-success");
                }
              },
              {
                _type: "label",
                class: "event-control-failure",
                _text: "_once: mount + click (triggered automatically)",
                title: "mount event trigger click event",
                _once: {
                  "mount": (xobj, event) => {
                    xobj.click(); // mount trigger click event
                  },
                  "click": (xobj, event) => {
                    xobj.replaceClass("event-control-failure", "event-control-success");
                  }
                }
              },
              {
                _type: "button",
                class: "event-button",
                _text: "Click me",
                _on: {
                  "click": (xobj, event) => {
                    xobj._text = "Button clicked";
                  }
                }
              },
              XUI.wrap([
                {
                  _type: "button",
                  class: "event-button",
                  _text: "Fire data",
                  _on_click: (xobj, event) => {
                    _xd._o["xdata"] = Date.now();
                  }
                },
                {
                  _type: "label",
                  class: "",
                  _text: "on data [xdata] with function",
                  _data_source: "xdata",
                  _on_data: (xobj, data) => {
                    xobj._text = "[Data]: " + data;
                  }
                }
              ]),
              XUI.wrap([
                {
                  _type: "button",
                  class: "event-button",
                  _text: "Remove label",
                  _on_click: (xobj, event) => {
                    XUI.remove("remove-me");
                  }
                },
                {
                  _id: "remove-me",
                  _type: "label",
                  _text: "will be removed",
                },
                {
                  _type: "button",
                  class: "event-button",
                  _text: "Add label",
                  _on_click: (xobj, event) => {
                    XUI.append({
                      _id: "remove-me",
                      _type: "label",
                      _text: "will be removed",
                    }, "remove-box");
                  }
                },
              ], { _id: "remove-box" }),
              XUI.wrap([
                {
                  _type: "button",
                  class: "event-button",
                  _text: "Toggle",
                  _on_click: (xobj, event) => {
                    XUI.toggle("xui-om-objects");
                  }
                },
                {
                  _id: "xui-om-objects",
                  _text: "Hide/Show me",
                }]),
              XUI.wrap([
                {
                  _type: "text",
                  _text: "Text",
                  _id: "text-to-test"
                },
                {
                  _type: "button",
                  _text: "Click me",
                  _on_click: (xobj, event) => {
                    (XUI as any)._o["text-to-test"]._text = "Button clicked";
                  }
                }
              ]),
            ]
          },
          {
            _type: "view",
            _id: "event-control-2",
            class: "event-control",
            _children: [
              {
                _type: "label",
                _text: "XUI",
              },
              {
                _id: "xui-om-objects-2",
                _type: "label",
                class: "",
                style: "",
                _text: "xui-om-objects",
                _data_source: "xui-om-objects",
                _on_data: "set-text-from-data empty:false pattern:'XUI OM Objects: $data'"
              },
              {
                _type: "label",
                class: "event-control-failure",
                _text: "mount event with _on property",
                _on: {
                  "mount": (xobj, event) => {
                    xobj.replaceClass("event-control-failure", "event-control-success");
                  }
                }
              },
              {
                _type: "view",
                class: "xflex",
                _id: "on_mount_check_box_2",
                _children: [
                  {
                    _type: "view",
                    class: "event-control-failure",
                    _id: "on_mount_check_2",
                    _text: "on_mount_check",
                    _on_mount: async (xobj, event) => {
                      xobj.replaceClass("event-control-failure", "event-control-success");
                      XUI.append({
                        _type: "label",
                        class: "event-control-failure",
                        _text: "mounted by on_mount_check_box",
                        _on_mount: async (xobj, event) => {
                          xobj.replaceClass("event-control-failure", "event-control-success");
                          console.log("mounted by on_mount_check_box");
                          await _x.delay(1000);
                        }
                      }, "on_mount_check_box_2");
                    },
                  }
                ]
              },
              // ... (the rest of your second event-control block – kept same as original)
              // You can keep everything here exactly as you had it before.
              XUI.wrap([
                {
                  _type: "text",
                  _text: "Text",
                  _id: "text-to-test-2"
                },
                {
                  _type: "button",
                  _text: "Click me NC",
                  _debug: true, //enable debug mode for the button
                  _nano_commands: {
                    "set-text-from-click": async (xobj, event) => {
                      xobj._text = "Button clicked";
                      _xlog.log("Button clicked"); //log the button click event
                    }
                  },
                  _on: {
                    "click": "set-text-from-click"
                  }
                }
              ]),
            ]
          }
        ]
      }
    ]
  };

  // ---------------------------------------------------------------------------
  // 3) Second simple view to test XVM navigation
  // ---------------------------------------------------------------------------
  const statsView: XObjectData = {
    _id: "stats-view",
    _type: "view",
    class: "stats-view",
    style: "width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;",
    _children: [
      {
        _type: "label",
        _id: "stats-title",
        class: "page-title",
        _text: "📊 Stats View (XVM test)"
      },
      {
        _type: "button",
        _id: "back-to-main",
        class: "event-button",
        _text: "Back to main view",
        _on_click: () => {
          XVM.back("root-container");
        }
      }
    ]
  };

  // ---------------------------------------------------------------------------
  // 4) Register raw views with XVM & show mainView
  // ---------------------------------------------------------------------------
  XVM.registerRawView(mainView, "root-container");
  XVM.registerRawView(statsView, "root-container");

  // Initially show your original demo view:
  XVM.showById("main-view", "root-container");

  // ---------------------------------------------------------------------------
  // 5) Add a small toolbar to switch views using XVM
  // ---------------------------------------------------------------------------
  const toolbar: XObjectData = {
    _id: "toolbar",
    _type: "view",
    class: "toolbar",
    style: "position:absolute;top:0;left:0;padding:8px;display:flex;gap:8px;z-index:1000;",
    _children: [
      {
        _type: "button",
        _id: "btn-main-view",
        class: "event-button",
        _text: "Main view",
        _on_click: () => {
          XVM.showById("main-view", "root-container");
        }
      },
      {
        _type: "button",
        _id: "btn-stats-view",
        class: "event-button",
        _text: "Stats view",
        _on_click: () => {
          XVM.showById("stats-view", "root-container");
        }
      }
    ]
  };

  XUI.add(toolbar);

  // Optional: log active view every few seconds
  setInterval(() => {
    const active = XVM.getActiveViewId("root-container");
    console.log("XVM active view:", active);
  }, 5000);
}

main().catch(console.error);
