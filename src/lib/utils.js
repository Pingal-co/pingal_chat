
/*
Lazy data transformation functions
so that we can write chained functions.

Live updates: If you update the data, the results of chained functions are also updated


*/

export let toString = Object.prototype.toString
export let isArray = (o) => {
    return toString.call(o) == '[object Array]';
}
export let isFunction = (o) => {
    return toString.call(o) == '[object Function]';
}

// for any function, reverse its arguments
export let flip = (fn) => {
    return () => {
        let args = [].slice.call(arguments)
        return fn.apply(this, args.reverse())
    }
}

// curries the function from right to left
export let rightCurry = (fn, n) => {
    let arity = n || fn.length
    let flippedfn = flip(fn)
    let curried = () => {
        let args = [].slice.call(arguments)
        let context = this
        let numArgsGreaterThanAirty = flippedfn.apply(context, args.slice(0, arity))
        let numArgsLessThanAirty = () => {
              let rest = [].slice.call(arguments);
              return curried.apply(context, args.concat(rest));
        };
        return (args.length >= arity) ?
            numArgsGreaterThanAirty : 
            numArgsLessThanAirty
    }
    return curried
}

// function to access a property on an object
export let get = (obj, prop) => { return obj[prop]; }  
// Curried version of `get()`
export let getWith = rightCurry(get);

/*
Ramda.js
Accepts a function fn and a list of transformer functions for all arguments and returns a new curried function.
*/
export let useWith = (fn /*, txfn, ... */) => {  
  let transforms = [].slice.call(arguments, 1)
  let _transform = (args) => {
        let t = (arg,i) => {
            transforms[i](arg)
        }
        return args.map(t);
      };
  let new_curried = () => {
      let args = [].slice.call(arguments)
      let targs = args.slice(0, transforms.length)
      let remaining = args.slice(transforms.length)
      return fn.apply(this, _transform(targs).concat(remaining))
  }
  
  return new_curried
}

// A function to filter a list with a given predicate
export let filter = (list,fn) => {return list.filter(fn)}
export let filterWith = rightCurry(filter)


export let map = (list, fn) => {return list.map(fn)}
export let mapWith = rightCurry(map)

export let flatten = (list) => {
    let fn = (items, item) => {
        return isArray(item) ? items.concat(item) : item;
    }
    return list.reduce(fn, [])
}

export let flatMap = (list, fn) => {  
  return flatten(map(list, fn));
}
export let flatMapWith = rightCurry(flatMap);  

// For each object in `list`, return the value of `prop`
export let pluck = (list, prop) => {  
  return mapWith(getWith(prop))(list);
}
// right curried version of `pluck`
export let pluckWith = rightCurry(pluck); 

export let mapObject = (obj, fn) => { 
    let reduce_fn = (res, key) => {
        res[key] = fn.apply(this, [key, obj[key]]);
    return res;
  }
  return keys(obj).reduce(reduce_fn, {});
}
// A right curried version
export let mapObjectWith = rightCurry(mapObject); 

export let group = (list, prop) => {
    let groupedfn = (grouped, item) => {
        let key = isFunction(prop) ? prop.apply(this, [item]) : item[prop];
        grouped[key] = grouped[key] || [];
        grouped[key].push(item);
        return grouped;
    }
    return list.reduce(groupedfn, {})
}
// right curried version of `group()`
export let groupBy = rightCurry(group);  

// join tables: reduce a list 
export let pair = (list, listfn) => {
    isArray(list) || (list = [list]);
    (isFunction(listFn) || isArray(listFn)) || (listFn = [listFn])
    let leftFn = (itemLeft) => {
        let rightFn = (itemRight) => {return [itemLeft, itemRight]}
        let rightList = isFunction(listFn) ? listFn.call(this, itemLeft) : listFn
        return mapWith(rightFn)(rightList)
    }
     let leftJoin = flatMapWith(leftFn) 
     return leftJoin(list)
}

export let pairWith = rightCurry(pair);

export let sort = (list, fn) => {  
  return [].concat(list).sort(fn);
}
export let sortBy = rightCurry(sort);  // right curried version

// -1, 0, 1 return values used by sorting routines.
export let comparator = (fn) => { 
    let compare = (a,b) => {
        return fn(a,b) ? -1
            : fn(b,a) ? 1
            : 0;
    }
    return compare;
}
