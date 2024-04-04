// 格式化 val 显示字符，string类型需要带单引号，以及显示含有 null、undefined 的数组
const formatLog = (val) => {
    // 字符串返回时带 'xxx'，以区别字符串和数字类型
    if (typeof val === 'string') {
        return `'${val}'`
    } if (typeof val === 'object') {
        if (Array.isArray(val)) {
            // [null, undefined] 默认转为 '[]'，需提前处理成 string 转为 '[null, undefined]'
            return `[${val.map(item => (item == null ? '' + item : item))}]`;
        }
    }

    return val;
}
/**
 * 抽象相等 x == y 算法实现
 * desc 用于记录规则转换过程信息
 */
function abstractEquality(x, y, desc) {
    // 返回 val 类型（共 8 种，string、number、bigint、boolean、undefined、symbol、null、object）
    const toType = (val) => {
        let type = typeof val;
        if (type === 'object') {
            // 考虑 typeof null = 'object' 情况
            if (val === null) {
                type = 'null';
            }
        } else if (type === 'function') {
            // 函数也是一个对象
            type = 'object';
        }
        return type;
    }
    const typeX = toType(x);
    const typeY = toType(y);
    let result = undefined;
    // console.log('abstractEquality toType', { x, y, typeX, typeY });
    if (typeX === typeY) {
        // 1. 如果 x 与 y 类型相同，等同于严格相等 x === y。
        result = (x === y);
        console.log(`${desc} => ${result} 「规则 1 转严格相等判断」`);
    } else {
        if ((typeX === 'null' && typeY === 'undefined')
            || (typeX === 'undefined' && typeY === 'null')) {
            // 2. 如果 x 类型为 null 且 y 类型为 undefined，则返回 true。
            // 3. 如果 x 类型为 undefined 且 y 类型为 null，则返回 true。
            // 这是规则，不是逻辑。
            result = true;
            console.log(`${desc} => ${result} 「约定规则 2、3」`);
        } else if (typeX === 'number' && typeY === 'string') {
            // 4. 如果 x 类型是 number 且 y 类型是 string，则将 y 强制转换为数字类型再递归比较。
            result = abstractEquality(x, +y, `${desc} => ${formatLog(x)} == ToNumber(${formatLog(y)})「规则 4」=> ${formatLog(x)} == ${formatLog(+y)}`);
        } else if (typeX === 'string' && typeY === 'number') {
            // 5. 如果 x 类型是 string 且 y 类型是 number，则将 x 强制转换为数字类型再递归比较。
            result = abstractEquality(+x, y, `${desc} => ToNumber(${formatLog(x)}) == ${formatLog(y)} 「规则 5」=> ${formatLog(+x)} == ${formatLog(y)}`);
        } else if (typeX === 'boolean') {
            // 6. 如果 x 类型是 boolean，则将 x 强制转换为数字类型再递归比较。
            result = abstractEquality(x ? 1 : 0, y, `${desc} => ToNumber(${formatLog(x)}) == ${formatLog(y)} 「规则 6」=> ${formatLog(+x)} == ${formatLog(y)}`);
        } else if (typeY === 'boolean') {
            // 7. 如果 y 类型是 boolean，则将 y 强制转换为数字类型再递归比较。
            result = abstractEquality(x, y ? 1 : 0, `${desc} => ${formatLog(x)} == ToNumber(${formatLog(y)}) 「规则 7」=> ${formatLog(x)} == ${formatLog(+y)}`);
        } else if ((typeX === 'string' || typeX === 'number') && typeY === 'object') {
            // 8. 如果 x 类型是 string 或 number 并且 y 类型是 object，则将对象 y 强制转换为原始值再递归比较。
            // 强制类型转换 [Symbol.toPrimitive](hint) {} : +y (hint 参数值是 'number'); `${obj2}` (hint 参数值是 'string'); obj2 + '' (hint 参数值是 'default')。
            result = abstractEquality(x, y + '', `${desc} => ${formatLog(x)} == ToPrimitive(${formatLog(y)}) 「规则 8」=> ${formatLog(x)} == ${formatLog(y + '')}`);
        } else if (typeX === 'object' && (typeY === 'string' || typeY === 'number')) {
            // 9. 如果 x 类型是 object 并且 y 类型是 string 或 number，则将对象 x 强制转换为原始值再递归比较。
            result = abstractEquality(x + '', y, `${desc} => ToPrimitive(${formatLog(x)}) == ${formatLog(y)} 「规则 9」=> ${formatLog(x + '')} == ${formatLog(y)}`);
        } else {
            // 10. 返回false。
            result = false;
            console.log(`${desc} => ${result} 「约定规则 10」`);
        }
    }
    return result;
}
/** 抽象相等 x == y 用例 */
function abstractEqualityCase(x, y) {
    console.log(`${formatLog(x)} == ${formatLog(y)} ${(abstractEquality(x, y, `${formatLog(x)} == ${formatLog(y)}`) ? '成立' : '不成立')}`);
}

// 测试用例
console.log("问题 1：'42' == true  和  '42' == false 均为 false。");
abstractEqualityCase('42', true);
abstractEqualityCase('42', false);

console.log("\n问题 2：null == undefined 为 true，但 null == ''、undefined == ''、null == 0、undefined == 0、null == false 和 undefined == false 均为 false。");
abstractEqualityCase(null, undefined);
abstractEqualityCase(null, '');
abstractEqualityCase(undefined, '');
abstractEqualityCase(null, 0);
abstractEqualityCase(undefined, 0);
abstractEqualityCase(null, false);
abstractEqualityCase(undefined, false);

console.log("\n问题 3：'' == false 为 true。");
abstractEqualityCase('', false);

console.log("\n问题 4：[42] == 42 为 true。");
abstractEqualityCase([42], 42);

console.log("\n问题 5：[] == ![] 为 true。");
abstractEqualityCase([], ![]);

console.log("\n问题 6：'' == [null] 为 true。");
abstractEqualityCase('', [null]);

console.log("\n问题 7：NaN == NaN 为 false。");
abstractEqualityCase(NaN, NaN);

