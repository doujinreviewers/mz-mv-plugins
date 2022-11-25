/*:ja
 * @target MV
 * @plugindesc メッセージ機能を強化するプラグイン
 * @author 同人Reviewers
 * 
 * @help DRS_MagicalText.js
 * テキストメッセージについて、スキップ、自動送り、バックログの3つの機能を追加するプラグインです。
 * 
 */

'use strict';
{
  let params = PluginManager.parameters("MagicalText");

  let autoFlag = false;
  let timerId = null;
  let send = false;

  Input.keyMapper[65] = 'A';

  let Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    Scene_Map_update.call(this);
    if(Input.isTriggered('A')){
      if(autoFlag){
        autoFlag = false;
      }else{
        autoFlag = true;
      }
    }
  }

  let Window_Message_startPause = Window_Message.prototype.startPause;
  Window_Message.prototype.startPause = function() {
    Window_Message_startPause.call(this);
    if (autoFlag) {
      timerId = setTimeout(function() {
        send = true;
      }, 2000);
    }
  };

  let Window_Message_startMessage = Window_Message.prototype.startMessage;
  Window_Message.prototype.startMessage = function() {
    if (timerId) {
      clearTimeout(timerId);
    }
    Window_Message_startMessage.call(this);
  };

  let _Window_Message_updateWait = Window_Message.prototype.updateWait;
  Window_Message.prototype.updateWait = function() {
    if (Input.isPressed("control")) {
      this._waitCount = 0;
    }
    return _Window_Message_updateWait.call(this);
  };

  let _Window_Message_updateShowFast = Window_Message.prototype.updateShowFast;
  Window_Message.prototype.updateShowFast = function() {
    _Window_Message_updateShowFast.call(this);

    if(Input.isPressed("control")){
      this._showFast = true;
      this._pauseSkip = true;
    }
  };

  let _Window_Message_isTriggered = Window_Message.prototype.isTriggered;
  Window_Message.prototype.isTriggered = function() {
    if(Input.isPressed("control")){
      return true;
    }
    if(send){
      send = false;
      return true;
    }
    return _Window_Message_isTriggered.call(this);
  };

}