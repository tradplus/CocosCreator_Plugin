package utils;

import android.content.Context;
import android.content.res.Resources;

public class ResourceUtils {


    public static int getViewIdByName(Context context, String name){

        Resources resources = context.getResources();
        String packageName = context.getPackageName();

        int id = resources.getIdentifier(name, "id", packageName);
        return id;
    }
    public static int getLayoutIdByName(Context context, String name){

        Resources resources = context.getResources();
        String packageName = context.getPackageName();

        int id = resources.getIdentifier(name, "layout", packageName);
        return id;
    }
    public static int getStyleIdByName(Context context, String name){

        Resources resources = context.getResources();
        String packageName = context.getPackageName();

        int id = resources.getIdentifier(name, "style", packageName);
        return id;
    }
    public static int getStringByName(Context context, String name){

        Resources resources = context.getResources();
        String packageName = context.getPackageName();

        int id = resources.getIdentifier(name, "string", packageName);
        return id;
    }
    public static int getDrawableByName(Context context, String name){

        Resources resources = context.getResources();
        String packageName = context.getPackageName();

        int id = resources.getIdentifier(name, "drawable", packageName);
        return id;
    }
}
