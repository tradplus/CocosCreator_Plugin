package common;

import android.app.Activity;

import com.cocos.service.SDKWrapper;

public class BaseCocosPlugin {

    public static Activity getActivity() {
        return SDKWrapper.shared().getActivity();
    }

}
