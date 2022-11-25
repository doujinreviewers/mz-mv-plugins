/*:ja
 * @target MV
 * @plugindesc メッセージ機能を強化するプラグイン
 * @author 同人Reviewers
 * 
 * @help DRS_MagicalText.js
 * テキストメッセージにスキップと自動送りを追加するプラグインです。
 * 
 * ・スキップ
 * Ctrlキーを押している間メッセージをスキップします。
 * 
 * ・自動送り
 * Aキーを押すと5秒ごとにメッセージを自動で送るようになります。
 * この秒数を変更したい場合はmsecの値を変更してください。
 * 自動送りを解除するにはもう一度Aキーを押します。
 * 
 */

'use strict';
{
  let params = PluginManager.parameters("MagicalText");

  let autoFlag = false;
  let timerId = null;
  let send = false;
  let msec = 5000; // 5000 = 5秒ごとに自動送り

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
      }, msec);
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