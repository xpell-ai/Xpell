import {_x,_xd,_xem,_xlog,_xu,XUI} from "xpell-ui";
import "./style/xapp.css";

async function main() {
  _x.verbose = true;           
    // display Xpell engine info
  _x.start();                    // start Xpell frame engine
  _x.loadModule(XUI);            // load XUI module

  // Create the main player div and attach to body
  XUI.createPlayer("xplayer");
  
  const mainView = {
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
            _id: "hello-world",
            class: "event-control",
            _text: "Hello, World!"
          }
          
        ]
      }
    ]
  };

  
  
  const containerView = {
    _id: "root-container",
    _type: "view",
    class: "root-container",
    _children: [mainView]
  };

  const container = XUI.add(containerView);
  
}

main().catch(console.error);
