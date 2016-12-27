package com.cf.code.plugins;

import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by congfeng on 16/12/27.
 * Email 3024992@qq.com
 */

public class ErrorCrash extends CordovaPlugin {

    private static final String LOG_TAG = "ErrorCrash";

    static Thread.UncaughtExceptionHandler DefaultHandler;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        LOG.i(LOG_TAG,"执行ErrorCrash."+action);
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        DefaultHandler = Thread.getDefaultUncaughtExceptionHandler();
        Thread.setDefaultUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {
            @Override
            public void uncaughtException(Thread thread, Throwable ex) {
                Log.e(LOG_TAG,"捕获全局异常",ex);
                if(ex == null){
                    if(DefaultHandler != null){
                        DefaultHandler.uncaughtException(thread, ex);
                    }else{
                        //退出程序Ø
                        android.os.Process.killProcess(android.os.Process.myPid());
                        System.exit(1);
                    }
                    return ;
                }
                android.os.Process.killProcess(android.os.Process.myPid());
                System.exit(1);
            }
        });
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

}
