package utils;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Point;
import android.os.Build;
import android.view.WindowManager;

import com.tradplus.ads.base.bean.TPAdError;
import com.tradplus.ads.base.bean.TPAdInfo;
import com.tradplus.ads.common.serialization.JSON;
import com.tradplus.ads.common.serialization.TypeReference;

import java.util.HashMap;

public class TPUtils {
    public static HashMap<String, Object> tpAdInfoToMap(TPAdInfo tpAdInfo) {

        HashMap<String, Object> infoMap = null;
        try{
            infoMap = JSON.parseObject(JSON.toJSONString(tpAdInfo), new TypeReference<HashMap<String, Object>>() {});

        }catch (Exception e){

        }

        return infoMap;
    }

    public static HashMap<String, Object> tpErrorToMap(TPAdError tpAdError) {
        HashMap<String, Object> infoMap = new HashMap<>();
        try{
            infoMap.put("code", tpAdError.getErrorCode());
            infoMap.put("msg", tpAdError.getErrorMsg());
        }catch (Exception e){

        }

        return infoMap;
    }

    public static int getLayoutIdByName(Context context, String name){

        Resources resources = context.getResources();
        String packageName = context.getPackageName();

        int id = resources.getIdentifier(name, "layout", packageName);
        return id;
    }

    public static int dip2px(Context context, double dipValue) {
        float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dipValue * scale + 0.5);
    }

    /**
     * 屏幕高度
     * @return the height of screen, in pixel
     */
    public static int getScreenWidth(Context context) {
        try {
            WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
            Point point = new Point();
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                //noinspection ConstantConditions
                wm.getDefaultDisplay().getRealSize(point);
            } else {
                //noinspection ConstantConditions
                wm.getDefaultDisplay().getSize(point);
            }
            return point.x;
        }catch(Throwable throwable) {
            throwable.printStackTrace();
            return 0;
        }
    }
}
