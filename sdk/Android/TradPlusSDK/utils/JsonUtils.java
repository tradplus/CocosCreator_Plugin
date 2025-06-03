package utils;

import android.text.TextUtils;
import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.HashMap;
import java.util.Map;

public class JsonUtils {

    private final static String TAG = "JsonUtils";

    private final static Gson gson = new Gson();

    public static Map<String,Object> jsonToMapObject(String jsonStr) {
        if(TextUtils.isEmpty(jsonStr)) return new HashMap<>();
        try {
            return gson.fromJson(jsonStr, new TypeToken<HashMap<String,Object>>(){}.getType());
        }catch (Throwable throwable){
            Log.e(TAG,"setCustomMap:"+throwable.getMessage());
            return new HashMap<>();
        }
    }

    public static Map<String,String> jsonToMapString(String jsonStr) {
        if(TextUtils.isEmpty(jsonStr)) return new HashMap<>();
        try {
            return gson.fromJson(jsonStr, new TypeToken<HashMap<String,String>>(){}.getType());
        }catch (Throwable throwable){
            Log.e(TAG,"setCustomMap:"+throwable.getMessage());
            return new HashMap<>();
        }
    }

}
