
/*
    Текущая ширина страницы
 */
export function winWidth() {
    return Math.max(window.innerWidth || 0, document.documentElement.clientWidth);
}

/*
    Обертка над функцией, гарантирующая, что функция будет выполняется не чаще,
    чем раз в time миллисекунд.
 */
export function rared(callback, time) {
    var sleeping, sleeping_call, that, args;
    return function() {
        if (sleeping) {
            sleeping_call = true;
            that = this;
            args = arguments;
            return;
        }

        callback.apply(this, arguments);
        sleeping = setTimeout(function() {
            if (sleeping_call) {
                callback.apply(that, args);
                sleeping_call = false;
            }
            sleeping = null;
        }, time);
    }
}
