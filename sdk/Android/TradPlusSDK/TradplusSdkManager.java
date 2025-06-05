

import android.text.TextUtils;
import android.util.Log;
import common.BaseCocosPlugin;
import utils.JsonUtils;
import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.tradplus.ads.base.TPPlatform;
import com.tradplus.ads.base.TradPlus;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.base.common.TPDiskManager;
import com.tradplus.ads.base.common.TPPrivacyManager;
import com.tradplus.ads.base.network.TPSettingManager;
import com.tradplus.ads.base.util.SegmentUtils;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.common.serialization.JSONArray;
import com.tradplus.ads.core.GlobalImpressionManager;
import com.tradplus.ads.open.TradPlusSdk;
//import com.tradplus.meditaiton.utils.ImportSDKUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TradplusSdkManager extends BaseCocosPlugin {

    private final static String TAG = "TradPlusData";
    private static String mAppId;
    //初始化
    public static void initSDKWithAppId(String appId) {
        Log.d(TAG,"initSDKWithAppId:"+appId);
        mAppId = appId;
        if (!TradPlusSdk.getIsInit()) {
            // 初始化是否成功 （可选）
            TradPlusSdk.setTradPlusInitListener(() ->
                    {
                        Log.d(TAG,"onInitSuccess:");
                        CocosHelper.runOnGameThread(() -> {
                            CocosJavascriptJavaBridge.evalString("window.TradPlusAds.TradplusAdsListener.onInitFinish(true)");
                        });
                    }
            );
            // 初始化SDK
            TradPlusSdk.initSdk(getActivity(), appId);
        }
    }

    public static void setPlatformLimit(String jsonStr) {
        Log.d(TAG,"setPlatformLimit:"+jsonStr);
        try{
            ArrayList<TPPlatform> arrayList = new Gson().fromJson(jsonStr, new TypeToken<ArrayList<TPPlatform>>(){}.getType());
            TradPlusSdk.setPlatformLimit(arrayList);
        }catch (Throwable t){
            t.printStackTrace();
        }
    }

    public static void setCustomTestID(String customTestID) {
        Log.d(TAG,"setCustomTestID:"+customTestID);
        TradPlus.setTestCustomId(customTestID);
    }

    public static void setPAConsent(int consent) {
        Log.d(TAG,"setPAConsent:"+consent);
        TradPlusSdk.setPAConsent(consent);
    }

    public static void setCustomMap(String jsonStr) {
        if(TextUtils.isEmpty(jsonStr)) return;
        try {
            SegmentUtils.initCustomMap(JsonUtils.jsonToMapString(jsonStr));
        } catch (Throwable throwable) {
        }
        Log.d(TAG,"setCustomMap:"+jsonStr);
    }

    public static void setSettingDataParam(String jsonStr) {
        if(TextUtils.isEmpty(jsonStr)) return;
        Log.d(TAG,"setSettingDataParam:"+jsonStr);
        try {
            Map<String,Object> temp = JSON.parseObject(jsonStr);

            if(temp != null){
                for(Map.Entry<String, Object> entry:temp.entrySet()){
                    Object value = entry.getValue();
                    String key = entry.getKey();

                    if(value != null && value instanceof JSONArray){
                        ArrayList<Object> arrayList = new ArrayList<>();

                        for(int i = 0; i < ((JSONArray)value).size();i++){
                            arrayList.add(((JSONArray)value).get(i));
                        }

                        entry.setValue(arrayList);
                    }
                }

            }
            com.tradplus.ads.open.TradPlusSdk.setSettingDataParam(temp);

        }catch (Throwable throwable){
            throwable.printStackTrace();
        }
    }

    public static String sdkVersion() {
        Log.d(TAG,"sdkVersion:"+TradPlusSdk.getSdkVersion());
        try {
            return com.tradplus.ads.open.TradPlusSdk.getSdkVersion();
        } catch (Throwable throwable) {

        }

        return "";
    }
    //是否在欧盟地区 此接口需要在初始化成功后调用
    public static boolean isEUTraffic() {
        boolean EUTraffic = TradPlusSdk.isEUTraffic(getActivity());
        Log.d(TAG,"isEUTraffic:"+EUTraffic);
        return EUTraffic;
    }
    //是否在加州地区 此接口需要在初始化成功后调用
    public static boolean isCalifornia() {
        boolean California = TradPlusSdk.isCalifornia(getActivity());
        Log.d(TAG,"isCalifornia:"+California);
        return California;
    }
    //设置 GDPR等级 是否允许数据上报: ture 设备数据允许上报, false 设备数据不允许上报
    public static void setGDPRDataCollection(boolean canDataCollection) {
        Log.d(TAG,"setGDPRDataCollection:"+canDataCollection);
        TradPlusSdk.setGDPRDataCollection(getActivity(),canDataCollection?0:1);
    }
    //获取当前 GDPR等级：  0 允许上报 , 1 不允许上报, 2 未设置
    public static int getGDPRDataCollection() {
        int isGDPRDataCollection = TradPlusSdk.getGDPRDataCollection(getActivity());
        Log.d(TAG,"getGDPRDataCollection:"+isGDPRDataCollection);
        return isGDPRDataCollection;
    }
    //设置 CCPA等级 是否允许数据上报: ture 加州用户接受上报数据, false 加州用户均不上报数据
    public static void setCCPADoNotSell(boolean canDataCollection) {
        Log.d(TAG,"setCCPADoNotSell:"+canDataCollection);
        TradPlusSdk.setCCPADoNotSell(getActivity(),canDataCollection);
    }
    //获取当前 CCPA等级： 0 允许上报 , 1 不允许上报, 2 未设置
    public static int getCCPADoNotSell() {
        int isCCPADoNotSell = TradPlusSdk.isCCPADoNotSell(getActivity());
        isCCPADoNotSell = isCCPADoNotSell==1?0:1;
        Log.d(TAG,"getCCPADoNotSell:"+isCCPADoNotSell);
        return isCCPADoNotSell;
    }
    //设置 COPPA等级 是否允许数据上报: ture 表明儿童, false 表明不是儿童
    public static void setCOPPAIsAgeRestrictedUser(boolean isChild) {
        Log.d(TAG,"setCOPPAIsAgeRestrictedUser:"+isChild);
        TradPlusSdk.setCOPPAIsAgeRestrictedUser(getActivity(),isChild);
    }
    //获取当前 COPPA等级： 0 表明儿童 , 1 表明不是儿童, 2 未设置
    public static int getCOPPAIsAgeRestrictedUser() {
        int isCOPPAAgeRestrictedUser = TradPlusSdk.isCOPPAAgeRestrictedUser(getActivity());
        isCOPPAAgeRestrictedUser = isCOPPAAgeRestrictedUser==1?0:1;
        Log.d(TAG,"getCOPPAIsAgeRestrictedUser:"+isCOPPAAgeRestrictedUser);
        return isCOPPAAgeRestrictedUser;
    }

    //设置 LGPD等级 是否允许数据上报: ture 设备数据允许上报, false 设备数据不允许上报
    public static void setLGPDConsent(boolean isConsent) {
        Log.d(TAG,"setLGPDConsent:"+isConsent);
        TradPlusSdk.setLGPDConsent(getActivity(),isConsent?0:1);
    }
    //获取当前 LGPD等级： 0 允许上报 , 1 不允许上报 2 未设置
    public static int getLGPDConsent() {
        int isLGPDConsent = TradPlusSdk.getLGPDConsent(getActivity());
        Log.d(TAG,"getLGPDConsent:"+isLGPDConsent);
        return isLGPDConsent;
    }
    //设置是否开启个性化推荐广告。 false 关闭 ，true 开启。SDK默认 true 开启
    public static void setOpenPersonalizedAd(boolean isOpen) {
        Log.d(TAG,"setOpenPersonalizedAd:"+isOpen);
        TradPlusSdk.setOpenPersonalizedAd(isOpen);
    }
    //当前的个性化状态  false 关闭 ，true 开启
    public static boolean isOpenPersonalizedAd() {
        boolean openPersonalizedAd = TradPlusSdk.isOpenPersonalizedAd();
        Log.d(TAG,"isOpenPersonalizedAd:"+openPersonalizedAd);
        return openPersonalizedAd;
    }
    //清理指定广告位下的广告缓存，一般使用场景：用于切换用户后清除激励视频的缓存广告
    public static void clearCache(String adUnitId) {
        Log.d(TAG,"clearCache:"+adUnitId);
        TradPlusSdk.clearCache(adUnitId);
    }
    //查询当前地区，此接口一般在初始化前调用来获取当前设备的地区状态。开发者可根据返回数据针对地区情况来设置各隐私权限。//使用时需要设置回调 OnCurrentAreaSuccess & OnCurrentAreaFailed 来获取查询状态。
    //OnCurrentAreaSuccess 返回的地区数据包括： bool isEu 是否欧洲, bool isCn 是否中国, bool isCa 是否加州
    //OnCurrentAreaFailed 时开发者需要自行查询或处理，设置各隐私权限。
    public static void checkCurrentArea() {
        Log.d(TAG,"checkCurrentArea:");
        TradPlusSdk.checkCurrentArea(getActivity(), new TPPrivacyManager.OnPrivacyRegionListener() {
            @Override
            public void onSuccess(boolean isEu, boolean isCn, boolean isCa) {
                Log.d(TAG,"checkCurrentArea onSuccess(isEu:"+isEu+",isCn:"+isCn+",isCa:"+isCa+")");
                CocosHelper.runOnGameThread(() -> {
                    CocosJavascriptJavaBridge.evalString("window.TradPlusAds.TradplusAdsListener.OnCurrentAreaSuccess("+isEu+","+isCn+","+isCa+")");
                });
            }

            @Override
            public void onFailed() {
                Log.d(TAG,"checkCurrentArea onFailed:");
                CocosHelper.runOnGameThread(() -> {
                    CocosJavascriptJavaBridge.evalString("window.TradPlusAds.TradplusAdsListener.OnCurrentAreaFailed('')");
                });
            }
        });
    }
    //打开测试工具
    //android https://docs.tradplusad.com/docs/tradplussdk_android_doc_v6/sdk_test_android/test_tool
//    public static void openTradPlusTool() {
//        Log.d(TAG,"openTradPlusTool:");
//        try {
//            ImportSDKUtil.getInstance().showTestTools(getActivity(),mAppId);
//        } catch (Throwable throwable) {
//            Log.i(TAG, "Not import tools sdk");
//        }
//    }
    //开启获取AuthId  false 关闭 ，true 开启
    public static void setAuthUID(boolean isCheck) {
        Log.d(TAG,"setAuthUID:");
        TradPlusSdk.setAuthUID(getActivity(),isCheck);
    }
    //选择是否开启自动加载重新load广告时，是否延迟2秒，bool isopen, 默认false 不使用延迟2s
    public static void setOpenDelayLoadAds(boolean isOpen) {
        Log.d(TAG,"setOpenDelayLoadAds:"+isOpen);
        TradPlusSdk.setOpenDelayLoadAds(isOpen);
    }
    //android 设置国内隐私权限 false 关闭 ，true 开启
    public static void setPrivacyUserAgree(boolean isOpen) {
        Log.d(TAG,"setPrivacyUserAgree:"+isOpen);
        TradPlusSdk.setPrivacyUserAgree(isOpen);
    }
    //android 国内隐私权限 是否打开，其他平台返回 false
    public static boolean isPrivacyUserAgree() {
        boolean privacyUserAgree = TradPlusSdk.isPrivacyUserAgree();
        Log.d(TAG,"isPrivacyUserAgree:"+privacyUserAgree);
        return privacyUserAgree;
    }
    //android 设置可使用数据库容量大小，到达数值后自动清空数据库，默认20MB
    public static void setMaxDatabaseSize(int size) {
        Log.d(TAG,"setMaxDatabaseSize:"+size);
        try {
            TPDiskManager.getInstance().setMaxDatabaseSize(size);
        } catch (Throwable throwable) {

        }
    }

    public static void clearCacheWithAdUnitId(String adUnitId) {
        Log.d(TAG,"clearCacheWithAdUnitId:"+adUnitId);
        com.tradplus.ads.open.TradPlusSdk.clearCache(adUnitId);
    }

    public static void addTPGlobalImpressionListener() {
        Log.d(TAG,"addTPGlobalImpressionListener:");
        com.tradplus.ads.open.TradPlusSdk.setGlobalImpressionListener(new GlobalImpressionManager.GlobalImpressionListener() {
            @Override
            public void onImpressionSuccess(TPAdInfo tpAdInfo) {
                CocosHelper.runOnGameThread(() -> {
                    CocosJavascriptJavaBridge.evalString("window.TradPlusAds.TradplusAdsListener.onGlobalAdImpression('"+JSON.toJSONString(tpAdInfo)+"')");
                });
            }
        });
    }
}
