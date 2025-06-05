
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import com.tradplus.ads.open.splash.TPSplash;
import utils.ResourceUtils;


public class TPSplashPopupWindow extends PopupWindow {

    private FrameLayout splash_container;
    private String unitId;
    private String sceneId;
    public static TPSplashPopupWindow instance;

    public TPSplashPopupWindow(Activity activity, ViewGroup container, String unitId, String sceneId) {
        super(container, LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT);
        this.unitId = unitId;
        this.sceneId = sceneId;
        initView(activity);
    }

    @SuppressLint("InflateParams")
    private void initView(Context context) {
        setContentView(LayoutInflater.from(context).inflate(ResourceUtils.getLayoutIdByName(context, "tp_splash_activity"), null));
        setTouchable(true);
        setBackgroundDrawable(new ColorDrawable(0x00000000));
        setOutsideTouchable(true);
        setFocusable(true);
        splash_container = getContentView().findViewById(ResourceUtils.getViewIdByName(context, "tp_splash_container"));

        instance = this;
        if (TextUtils.isEmpty(unitId)) {
            dismiss();
        }
        showSplash();
    }

    private void showSplash() {
        TPSplash tpSplash = TPCSplashManager.getTPSplash(unitId);
        if (tpSplash == null) return;
        if (!tpSplash.isReady()) return;
        if (splash_container != null && splash_container instanceof ViewGroup) {
            tpSplash.showAd(splash_container, sceneId);
        }
    }
}

    