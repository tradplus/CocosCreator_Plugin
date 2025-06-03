package offerwall;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.tradplus.ads.open.offerwall.OffWallBalanceListener;

public class TPOfferWallBalanceListener implements OffWallBalanceListener {
    private String adUnitId;

    public TPOfferWallBalanceListener(String adUnitId) {
        this.adUnitId = adUnitId;
    }

    @Override
    public void currencyBalanceSuccess(int i, String s) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onCurrencyBalanceSuccess('" + adUnitId + "','" + i + "','" + s + "')");
        });
    }

    @Override
    public void currencyBalanceFailed(String s) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onCurrencyBalanceFailed('" + adUnitId + "','" + s + "')");
        });
    }

    @Override
    public void spendCurrencySuccess(int i, String s) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onSpendCurrencySuccess('" + adUnitId + "','" + i + "','" + s + "')");
        });
    }

    @Override
    public void spendCurrencyFailed(String s) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onSpendCurrencyFailed('" + adUnitId + "','" + s + "')");
        });
    }

    @Override
    public void awardCurrencySuccess(int i, String s) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onAwardCurrencySuccess('" + adUnitId + "','" + i + "','" + s + "')");
        });
    }

    @Override
    public void awardCurrencyFailed(String s) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.onAwardCurrencyFailed('" + adUnitId + "','" + s + "')");
        });
    }

    @Override
    public void setUserIdSuccess() {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.setUserIdFinish('" + adUnitId + "',true)");
        });
    }

    @Override
    public void setUserIdFailed(String s) {
        CocosHelper.runOnGameThread(() -> {
            CocosJavascriptJavaBridge.evalString("window.TradPlusOfferwall.TPOfferwallListener.setUserIdFinish('" + adUnitId + "',false)");
        });
    }
}

