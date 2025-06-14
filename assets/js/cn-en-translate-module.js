function initI18n() {
    const lang = localStorage.getItem("lang");
    const defaultLang = lang ? lang : "en";

    $("[i18n]").i18n({
        defaultLang: defaultLang,
        filePath: getFilePath(),
        filePrefix: "i18n_",
        fileSuffix: "",
        forever: true,
        callback: function () {
            console.log("🌍 i18n is ready:", defaultLang);
        },
    });

    const text = defaultLang === "cn" ? "中/En" : "En/中";
    $("#nav__translate").text(text);

    // 绑定点击事件（用 off 防止重复）
    $("#translate").off("click").on("click", function () {
        const currentLang = localStorage.getItem("lang") || defaultLang;
        const targetLang = currentLang === "cn" ? "en" : "cn";
        const newText = targetLang === "cn" ? "中/En" : "En/中";
        $("#nav__translate").text(newText);

        $("[i18n]").i18n({
            defaultLang: targetLang,
            filePath: getFilePath(),
            callback: function () {
                localStorage.setItem("lang", targetLang);
                console.log("🌐 Switched to:", targetLang);
            }
        });
    });
}

// 自动判断路径前缀（在 index.html 时是 assets/i18n/，在子页面是 ../assets/i18n/）
function getFilePath() {
    const currentPath = window.location.pathname;
    return currentPath.includes("/projects/") ? "../assets/i18n/" : "assets/i18n/";
}
