

import android.content.Context;
import android.graphics.Color;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import banner.TPBannerAdListener;
import banner.TPBannerAllAdListener;
import banner.TPBannerDownloadListener;
import common.BaseCocosPlugin;
import common.ExtraInfo;
//import nativeAd.TPNativeAdListener;
import nativeAd.TPNativeAllAdListener;
import nativeAd.TPNativeDownloadListener;
import utils.JsonUtils;
import utils.TPUtils;

import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.base.common.TPTaskManager;
import com.tradplus.ads.base.util.SegmentUtils;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.common.util.ResourceUtils;
import com.tradplus.ads.common.util.ScreenUtil;
import com.tradplus.ads.core.AdCacheManager;
import com.tradplus.ads.core.cache.AdCache;
import com.tradplus.ads.mgr.nativead.TPNativeAdRenderImpl;
import com.tradplus.ads.open.banner.TPBanner;
import com.tradplus.ads.open.nativead.TPNative;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class TPCBannerManager extends BaseCocosPlugin {
    private final static String TAG = "TradPlusData";

    // 保存广告位对象
    private static Map<String, TPBanner> mTPBanner = new ConcurrentHashMap<>();

    public static void loadWithAdUnitID(String adUnitId, String sceneId, String extra) {
        Log.d(TAG, "loadWithAdUnitID adUnitId:" + adUnitId + ",extra:" + extra);
        TPBanner tpBanner = getTPBanner(adUnitId, extra);

        if (tpBanner != null) {
            ExtraInfo extraInfo = ExtraInfo.getExtraInfo(extra);
            if (extraInfo != null) {
                tpBanner.setAutoLoadCallback(extraInfo.isOpenAutoLoadCallback());
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            if(TextUtils.isEmpty(extraInfo.getBackgroundColor())){
                                tpBanner.setBackgroundColor(Color.TRANSPARENT);
                            }else {
                                tpBanner.setBackgroundColor(Color.parseColor(extraInfo.getBackgroundColor()));
                            }

                        } catch (Throwable throwable) {
                            throwable.printStackTrace();
                        }
                    }
                });

            }

            tpBanner.loadAd(adUnitId, sceneId, extraInfo == null ? 0f : extraInfo.getMaxWaitTime());
        }
    }

    public void setCustomShowData(String adUnitId, String data) {
        TPBanner tpBanner = getTPBanner(adUnitId);

        if (tpBanner != null) {
            tpBanner.setCustomShowData(JSON.parseObject(data));
        }
    }

    public static void showWithAdUnitID(String adUnitId, String sceneId) {
        TPBanner tpBanner = getTPBanner(adUnitId);
        if (tpBanner != null) {
            tpBanner.showAd();
        }

    }

    public static void hideWithAdUnitID(String adUnitId) {
        TPBanner tpBanner = getTPBanner(adUnitId);

        getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (tpBanner != null) {
                    tpBanner.setVisibility(View.GONE);
                }
            }
        });

    }

    public static void displayWithAdUnitID(String adUnitId) {
        TPBanner tpBanner = getTPBanner(adUnitId);
        getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (tpBanner != null) {
                    tpBanner.setVisibility(View.VISIBLE);
                }
            }
        });
    }


    public static void destroyWithAdUnitID(String adUnitId) {
        TPBanner tpBanner = getTPBanner(adUnitId);
        getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (tpBanner != null) {
                    if (tpBanner.getParent() != null) {
                        ((ViewGroup) tpBanner.getParent()).removeView(tpBanner);
                    }
                    tpBanner.onDestroy();
                    mTPBanner.remove(adUnitId);
                }
            }
        });

    }

    public static void entryAdScenarioWithAdUnitID(String adUnitId, String sceneId) {
        TPBanner tpBanner = getTPBanner(adUnitId);

        if (tpBanner != null) {
            tpBanner.entryAdScenario(sceneId);
        }


    }

    public static boolean adReadyWithAdUnitID(String adUnitId) {
        TPBanner tpBanner = getTPBanner(adUnitId);

        if (tpBanner != null) {
            return tpBanner.isReady();
        }

        return false;
    }

    public static void setCustomAdInfo(String jsonStr, String adUnitId) {
        Log.d(TAG, "setCustomAdInfo adUnitId:" + adUnitId);
        SegmentUtils.initPlacementCustomMap(adUnitId, JsonUtils.jsonToMapString(jsonStr));//仅对该广告位有效，会覆盖APP维度设置的规则

    }

    private static TPBanner getTPBanner(String adUnitId) {
        return mTPBanner.get(adUnitId);
    }

    private static TPBanner getTPBanner(String adUnitId, String data) {

        Log.i(TAG, "data = " + data + " mTPBanner = " + mTPBanner);

        ExtraInfo extraInfo = null;
        if (!TextUtils.isEmpty(data)) {
            extraInfo = JSON.parseObject(data, ExtraInfo.class);
        }

        HashMap<String, Object> temp = new HashMap<>();


        TPBanner tpBanner = mTPBanner.get(adUnitId);
        if (tpBanner == null) {
            tpBanner = new TPBanner(getActivity());
            mTPBanner.put(adUnitId, tpBanner);

            boolean closeAutoShow = extraInfo == null ? false : extraInfo.isCloseAutoShow();
            boolean isSimpleListener = extraInfo == null ? false : extraInfo.isSimpleListener();
            if (closeAutoShow) {
                tpBanner.closeAutoShow();
            }
            tpBanner.setAdListener(new TPBannerAdListener(adUnitId));
            if (!isSimpleListener) {
                tpBanner.setAllAdLoadListener(new TPBannerAllAdListener(adUnitId));
                tpBanner.setDownloadListener(new TPBannerDownloadListener(adUnitId));
            }

            String className = extraInfo == null ? "" : (TextUtils.isEmpty(extraInfo.getClassName()) ? "" : extraInfo.getClassName());

            if (!TextUtils.isEmpty(className)) {
                LayoutInflater inflater = (LayoutInflater) getActivity().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                ViewGroup layoutView = (ViewGroup) inflater.inflate(ResourceUtils.getLayoutIdByName(getActivity(), className), null);
                TPNativeAdRenderImpl adRender = new TPNativeAdRenderImpl(getActivity(), layoutView);
                tpBanner.setNativeAdRender(adRender);
            }


            TPBanner finalTpBanner = tpBanner;
            ExtraInfo finalExtraInfo = extraInfo;
            getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    RelativeLayout mLayout = null;
                    boolean hasPosition = false;
                    int x = 0, y = 0;
                    if (finalExtraInfo != null) {
                        if (finalExtraInfo.getX() != 0 || finalExtraInfo.getY() != 0) {
                            x = (int) finalExtraInfo.getX();
                            y = (int) finalExtraInfo.getY();
                            hasPosition = true;
                        }
                    }
                    mLayout = ScreenUtil.prepLayout(hasPosition ? 0 : (finalExtraInfo == null ? 0 : finalExtraInfo.getAdPosition()), mLayout, getActivity());

                    getActivity().addContentView(mLayout,
                            new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                    mLayout.removeAllViews();

                    mLayout.setVisibility(RelativeLayout.VISIBLE);


                    if (hasPosition) {
                        //设置锚点
                        finalTpBanner.setX(x);
                        finalTpBanner.setY(y);
                    }

                    mLayout.addView(finalTpBanner);

                    ViewGroup.LayoutParams params = finalTpBanner.getLayoutParams();

                    float density = ScreenUtil.getScreenDensity(getActivity());

                    int screenWidth = TPUtils.getScreenWidth(getActivity());
                    if (finalExtraInfo != null) {
                        float width = finalExtraInfo.getWidth();
                        float height = finalExtraInfo.getHeight();

                        if (width != 0) {
                            params.width = (int) (width * density);
                        } else {
                            params.width = screenWidth;
                        }

                        if (height != 0) {
                            params.height = (int) (height * density);
                        } else {
                            params.height = (int) (50 * density);
                        }
                    } else {
                        params.width = screenWidth;
                        params.height = (int) (50 * density);
                    }

                    finalTpBanner.setLayoutParams(params);
                }
            });

        }

        if (extraInfo != null) {
            boolean closeAutoDestroy = extraInfo.isCloseAutoDestroy();
            tpBanner.setAutoDestroy(!closeAutoDestroy);

            if (extraInfo.getLocalParams() != null) {
                temp = (HashMap<String, Object>) extraInfo.getLocalParams();
            }

            if (extraInfo.getWidth() != 0) {
                temp.put("width", (int) extraInfo.getWidth());
            }
            if (extraInfo.getHeight() != 0) {
                temp.put("height", (int) extraInfo.getHeight());
            }

            Log.v("TradPlusSdk", "setCustomParams unitid=" + adUnitId + "=======================" + JSON.toJSONString(temp));

            tpBanner.setCustomParams(temp);

            if (extraInfo.getCustomMap() != null) {
                SegmentUtils.initPlacementCustomMap(adUnitId, extraInfo.getCustomMap());
            }
        }

        return tpBanner;
    }

    private TPAdInfo getShowAdInfo(String unitId) {
        AdCache cache = AdCacheManager.getInstance().getReadyAd(unitId);
        if (cache == null) return null;
        return new TPAdInfo(unitId, cache.getAdapter());
    }

}
