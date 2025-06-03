package reward;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.google.gson.Gson;
import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.open.reward.RewardAdListener;

public class TPRewardAdListener implements RewardAdListener {
    private String mAdUnitId;

    public TPRewardAdListener(String adUnitId) {
        this.mAdUnitId = adUnitId;
    }
    @Override
    public void onAdLoaded(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onRewardVideoLoaded('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdClicked(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onRewardVideoClicked('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdImpression(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onRewardVideoImpression('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });

    }

    @Override
    public void onAdFailed(TPAdError tpAdError) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onRewardVideoLoadFailed('" + mAdUnitId + "','" + (new Gson().toJson(tpAdError)) + "')");
        });
    }

    @Override
    public void onAdClosed(TPAdInfo tpAdInfo) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onRewardVideoClosed('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdReward(TPAdInfo tpAdInfo) {
        // 给用户发放奖励
        // 在V6.4.5以后的版本，可以根据三方广告平台的文档来增加奖励验证功能（奖励验证需要开发者后台配合，TradPlus不提供后台服务奖励验证的功能）
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onRewardVideoRewarded('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdVideoStart(TPAdInfo tpAdInfo) {
        // V8.1.0.1 播放开始
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onRewardVideoPlayStart('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdVideoEnd(TPAdInfo tpAdInfo) {
        // V8.1.0.1 播放结束
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusRewardVideo.TPRewardVideoListener.onRewardVideoPlayEnd('" + mAdUnitId + "','" + (new Gson().toJson(tpAdInfo)) + "')");
        });
    }

    @Override
    public void onAdVideoError(TPAdInfo tpAdInfo, TPAdError tpAdError) {
    }
}

