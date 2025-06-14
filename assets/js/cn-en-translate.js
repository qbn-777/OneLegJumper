$(document).ready(function () {
    // ✅ 定义简历路径更新函数
    function updateCVLink(lang) {
        const btn = document.getElementById("cv-download-btn");
        if (!btn) return;
        btn.href = lang === "cn" 
            ? "assets/pdf/resume_cn.pdf" 
            : "assets/pdf/resume_en.pdf";
    }

    /* 默认语言设置 */
    const lang = localStorage.getItem("lang");
    const defaultLang = lang ? lang : "en";

    // ✅ 设置简历链接（首次加载时）
    updateCVLink(defaultLang);

    $("[i18n]").i18n({
        defaultLang: defaultLang,
        filePath: "assets/i18n/", // 路径配置
        filePrefix: "i18n_",
        fileSuffix: "",
        forever: true,
        callback: function () {
            console.log("i18n is ready.");
        },
    });

    /* 中英文切换按钮 */
    const text = defaultLang == "cn" ? "中/En" : "En/中";
    $("#nav__translate").text(text);

    $("#translate").click(function (e) {
        const currentLang = localStorage.getItem("lang") 
            ? localStorage.getItem("lang") 
            : defaultLang;
        const targetLang = currentLang == "cn" ? "en" : "cn"; // 目标语言
        const text = targetLang == "cn" ? "中/En" : "En/中";
        $("#nav__translate").text(text);

        $("[i18n]").i18n({
            defaultLang: targetLang,
            filePath: "assets/i18n/",
            callback: function () {
                localStorage.setItem("lang", targetLang);
                console.log(localStorage.getItem("lang"));
                
                // ✅ 切换语言后更新简历链接
                updateCVLink(targetLang);
            }
        });
    });
});
