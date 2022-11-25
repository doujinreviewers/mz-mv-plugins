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
    return _Window_Message_isTriggered.call(this);
  };

}