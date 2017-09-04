function getNext(str) {
    // 单个字符串得匹配值
    // 下标位置
    var index = 0;
    var commonStr = '';
    while (true) {
        // 如果超过最后一个得时候直接跳出
        if (++index > str.length - 1) {
            break;
        }
        var startStr = '';
        var endStr = '';
        for (var i = 0; i < index; i++) {
            startStr += str[i];
            endStr += str[str.length - (index - i)];
        }
        if (startStr === endStr) {
            commonStr = startStr;
            break;
        }
    }
    return commonStr.length;
}

function getNextArr(str) {
    // 组成部分匹配值数组
    var arr = [];
    var nextStr = '';
    for (var i = 0; i < str.length; i++) {
        nextStr += str[i];
        arr.push(getNext(nextStr));
    }
    return arr;
}

function KMPindexOf(longStr, shortStr) {
    // 先取到最近匹配值数组
    var arr = getNextArr(shortStr);
    console.log(arr);
    // 返回值下标
    var index = -1;
    // 找到赋值true
    var flag = false;
    // 开始循环
    for (var i = 0; i < longStr.length;) {
        // 内层找到了无法继续遍历
        if (flag) {
            break;
        }
        // 匹配下标
        var j = 0;
        if (longStr[i] === shortStr[j]) {
            j++;
            // 开始逐个遍历
            while (true) {
                if (j === shortStr.length) {
                    // 找到了 并获取了该下标
                    index = i;
                    flag = true;
                    break;
                }
                if (longStr[i + j] === shortStr[j]) {
                    j++;
                } else {
                    // 计算出位移的个数
                    i += j - arr[j];
                    break;
                }
            }
        } else {
            i++;
        }
    }
    return index;
}