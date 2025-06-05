

import android.app.Activity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import common.BaseCocosPlugin;
import common.ExtraInfo;

import nativeAd.TPNativeAllAdListener;
import nativeAd.TPNativeDownloadListener;
import utils.JsonUtils;
import com.tradplus.ads.base.util.SegmentUtils;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.common.util.ResourceUtils;
import com.tradplus.ads.common.util.ScreenUtil;
import com.tradplus.ads.open.nativead.TPNative;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class TPCNativeManager extends BaseCocosPlugin {
    private final static String TAG = "TradPlusData";

    // 保存广告位对象
    private static Map<String, nativeAd.TPNativeInfo> mTPNative = new ConcurrentHashMap<>();

    public static void loadWithAdUnitID(String adUnitId, String extra) {
        Log.d(TAG, "loadWithAdUnitID adUnitId:" + adUnitId + ",extra:" + extra);

        TPNative tpNative = getTPNative(adUnitId, extra).getTpNative();

        ExtraInfo extraInfo = ExtraInfo.getExtraInfo(extra);
        if(extraInfo != null){
            tpNative.setAutoLoadCallback(extraInfo.isOpenAutoLoadCallback());
        }

        if (tpNative != null) {
            tpNative.loadAd(extraInfo == null ? 0f : extraInfo.getMaxWaitTime());
        }

    }

    public static void showWithAdUnitID(String adUnitId, String sceneId, String layoutName) {
        nativeAd.TPNativeInfo info = getTPNative(adUnitId);

        if (info == null) return;

        getActivity().runOnUiThread(new Runnable() {
            public void run() {
                float density = ScreenUtil.getScreenDensity(getActivity());
                int height = 340;
                int width = 320;
                int x = 0, y = 0;
                TPNative tpNative = info.getTpNative();
                RelativeLayout layout = null;
                boolean hasPosition = false;
                ExtraInfo extraInfo = null;
                if (info != null) {
                    extraInfo = info.getExtraInfo();
                    if (extraInfo != null) {
                        if (extraInfo.getWidth() != 0 && extraInfo.getHeight() != 0) {
                            width = (int) extraInfo.getWidth();
                            height = (int) extraInfo.getHeight();
                        }

                        if (extraInfo.getX() != 0 || extraInfo.getY() != 0) {
                            x = (int) extraInfo.getX();
                            y = (int) extraInfo.getY();
                            hasPosition = true;
                        }

                    }
                }

                if (info.getParentView() == null) {
                    layout = ScreenUtil.prepLayout(hasPosition ? 0 : (extraInfo == null ? 0 : extraInfo.getAdPosition()), layout, getActivity());

                    getActivity().addContentView(layout,
                            new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

                } else {
                    layout = info.getParentView();
                    layout.removeAllViews();
                }
                FrameLayout frameLayout = new FrameLayout(getActivity());
                frameLayout.setLayoutParams(new RelativeLayout.LayoutParams((int) (width * density), (int) (height * density)));

                if (hasPosition) {
                    //设置锚点
                    frameLayout.setX(x);
                    frameLayout.setY(y);
                }
                layout.addView(frameLayout);
                info.setParentView(layout);


                layout.setVisibility(View.VISIBLE);


                if (mTPNative != null)
                    tpNative.showAd(frameLayout, ResourceUtils.getLayoutIdByName(getActivity(), TextUtils.isEmpty(layoutName) ? "tp_native_ad_list_item" : layoutName), sceneId);
            }
        });
    }

    public static void hideWithAdUnitID(String adUnitId) {
        nativeAd.TPNativeInfo tpNativeInfo = getTPNative(adUnitId);
        getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (tpNativeInfo != null) {
                    if (tpNativeInfo.getParentView() != null) {
                        tpNativeInfo.getParentView().setVisibility(View.GONE);
                    }
                }
            }
        });

    }

    public static void displayWithAdUnitID(String adUnitId) {
        nativeAd.TPNativeInfo tpNativeInfo = getTPNative(adUnitId);
        getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (tpNativeInfo != null) {
                    if (tpNativeInfo.getParentView() != null) {
                        tpNativeInfo.getParentView().setVisibility(View.VISIBLE);
                    }
                }
            }
        });
    }


    public static void destroyWithAdUnitID(String adUnitId) {
        nativeAd.TPNativeInfo tpNativeInfo = getTPNative(adUnitId);
        getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (tpNativeInfo != null) {
                    if (tpNativeInfo.getParentView() != null) {
                        tpNativeInfo.getParentView().removeAllViews();
                    }

                    if (tpNativeInfo.getTpNative() != null) {
                        tpNativeInfo.getTpNative().onDestroy();
                    }

                    mTPNative.remove(adUnitId);

                }
            }
        });

    }

    public static void entryAdScenarioWithAdUnitID(String adUnitId,String sceneId) {
        nativeAd.TPNativeInfo tpNativeInfo = getTPNative(adUnitId);
        if(tpNativeInfo == null) return;
        TPNative tpNative = tpNativeInfo.getTpNative();

        if (tpNative != null) {
            tpNative.entryAdScenario(sceneId);
        }

    }

    public static boolean adReadyWithAdUnitID(String unitId) {
        nativeAd.TPNativeInfo tpNativeInfo = getTPNative(unitId);
        if(tpNativeInfo == null) return false;

        TPNative tpNative = tpNativeInfo.getTpNative();
        if (tpNative != null) {
            return tpNative.isReady();
        }

        return false;
    }

    public static void setCustomAdInfo(String jsonStr,String adUnitId) {
        Log.d(TAG, "setCustomAdInfo adUnitId:" + adUnitId);
        SegmentUtils.initPlacementCustomMap(adUnitId, JsonUtils.jsonToMapString(jsonStr));//仅对该广告位有效，会覆盖APP维度设置的规则

    }

    public static nativeAd.TPNativeInfo getTPNative(String adUnitId, String data) {

        Log.i("tradplus", "data = " + data + " mTPNative = " + mTPNative);

        ExtraInfo extraInfo = null;
        if (!TextUtils.isEmpty(data)) {
            extraInfo = JSON.parseObject(data, ExtraInfo.class);
        }

        HashMap<String, Object> temp = new HashMap<>();

        nativeAd.TPNativeInfo tpNativeInfo = mTPNative.get(adUnitId);
        TPNative tpNative;
        if (tpNativeInfo == null) {
            tpNativeInfo = new nativeAd.TPNativeInfo();
            mTPNative.put(adUnitId, tpNativeInfo);

            tpNative = new TPNative(getActivity(), adUnitId);


            boolean isSimpleListener = extraInfo == null ? false : extraInfo.isSimpleListener();

            tpNative.setAdListener(new TPNativeAdListener(adUnitId));
            if(!isSimpleListener) {
                tpNative.setAllAdLoadListener(new TPNativeAllAdListener(adUnitId));
                tpNative.setDownloadListener(new TPNativeDownloadListener(adUnitId));
            }


            tpNativeInfo.setTpNative(tpNative);
            tpNativeInfo.setExtraInfo(extraInfo);


        } else {
            tpNative = tpNativeInfo.getTpNative();
        }

        if (extraInfo != null) {

            if (extraInfo.getLocalParams() != null) {
                temp = (HashMap<String, Object>) extraInfo.getLocalParams();
            }

            float width = 0, height = 0;
            if (extraInfo.getWidth() != 0) {
                width = extraInfo.getWidth();
            }
            if (extraInfo.getHeight() != 0) {
                height = extraInfo.getHeight();
            }

            if (width != 0 && height != 0) {
                tpNative.setAdSize((int) width, (int) height);
            }

            tpNative.setCustomParams(temp);

            if (extraInfo.getCustomMap() != null) {
                SegmentUtils.initPlacementCustomMap(adUnitId, extraInfo.getCustomMap());
            }
        }

        return tpNativeInfo;
    }

    public static nativeAd.TPNativeInfo getTPNative(String adUnitId) {
        return mTPNative.get(adUnitId);
    }

}
