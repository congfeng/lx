package com.cf.code.plugins;

import android.Manifest;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.webkit.MimeTypeMap;
import android.widget.Toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.File;

import static android.R.id.message;
import static android.content.Context.DOWNLOAD_SERVICE;

/**
 * Created by congfeng on 16/12/27.
 * Email 3024992@qq.com
 */

public class AppUpdater extends CordovaPlugin {

    private static final String LOG_TAG = "AppUpdater";

    private String downloadPath = "/apk/";

    private String apkName = "lx.apk";

    DownloadManager manager;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        LOG.i(LOG_TAG,"执行AppUpdater."+action);
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }else if(action.equals("start")){
            String url = args.getString(0);
            this.start(url, callbackContext);
            return true;
        }
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void start(String url, CallbackContext callbackContext) {
        if(ContextCompat.checkSelfPermission(cordova.getActivity(), Manifest.permission.WRITE_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(cordova.getActivity(), new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},1);
            callbackContext.error("请允许权限进行下载安装");
        }else{
            File apkFile = new File(Environment.getExternalStorageDirectory().getAbsolutePath()+ downloadPath + apkName);
            if(apkFile.exists()){
                apkFile.delete();
            }
            final DownloadManager manager = (DownloadManager)cordova.getActivity().getSystemService(DOWNLOAD_SERVICE);
            DownloadManager.Request down = new DownloadManager.Request(Uri.parse(url));
            down.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE| DownloadManager.Request.NETWORK_WIFI);
            down.setAllowedOverRoaming(false);
            MimeTypeMap mimeTypeMap = MimeTypeMap.getSingleton();
            String mimeString = mimeTypeMap.getMimeTypeFromExtension(MimeTypeMap.getFileExtensionFromUrl(url));
            down.setMimeType(mimeString);
            down.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
            down.setVisibleInDownloadsUi(true);
            down.setDestinationInExternalPublicDir(downloadPath,apkName);
            down.setTitle("乐X");
            manager.enqueue(down);
            cordova.getActivity().registerReceiver(new BroadcastReceiver(){
                @Override
                public void onReceive(Context context, Intent intent) {
                    long downId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
                    if(manager.getUriForDownloadedFile(downId) == null){
                        Toast.makeText(context,"下载失败",Toast.LENGTH_LONG).show();
                        return;
                    }
                    File file = new File(Environment.getExternalStorageDirectory().getAbsolutePath()+ downloadPath + apkName);
                    Intent installIntent = new Intent();
                    installIntent.addFlags(268435456);
                    installIntent.setAction("android.intent.action.VIEW");
                    String mimeType = getMIMEType(file);
                    installIntent.setDataAndType(Uri.fromFile(file), mimeType);
                    try {
                        context.startActivity(installIntent);
                    } catch (Exception var5) {
                        var5.printStackTrace();
                        Toast.makeText(context, "没有找到打开此类文件的程序", Toast.LENGTH_SHORT).show();
                    }
                }
            }, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
            callbackContext.success("success");
        }
    }

    private String getMIMEType(File file) {
        String fileName = file.getName();
        String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length()).toLowerCase();
        return MimeTypeMap.getSingleton().getMimeTypeFromExtension(fileExt);
    }

}
