const aTags = document.querySelectorAll('.redirect_btn');

aTags.forEach(aTag => {
    aTag.href = "https://" + getURLParameter('domain') + "/click";
});
