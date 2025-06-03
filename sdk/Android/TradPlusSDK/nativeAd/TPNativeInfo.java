package nativeAd;

import android.widget.RelativeLayout;

import common.ExtraInfo;
import com.tradplus.ads.open.nativead.TPNative;

public class TPNativeInfo {
    private TPNative tpNative;
    private ExtraInfo extraInfo;
    private RelativeLayout parentView;


    public ExtraInfo getExtraInfo() {
        return extraInfo;
    }

    public void setExtraInfo(ExtraInfo extraInfo) {
        this.extraInfo = extraInfo;
    }

    public TPNative getTpNative() {
        return tpNative;
    }

    public void setTpNative(TPNative tpNative) {
        this.tpNative = tpNative;
    }

    public RelativeLayout getParentView() {
        return parentView;
    }

    public void setParentView(RelativeLayout parentView) {
        this.parentView = parentView;
    }
}
