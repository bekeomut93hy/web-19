'use strict'

function search(input, target) {
  for (let i =0 ; i <input.length ; ++i)
    if(input[i] == target) return i;
    return -1;
}
function searchBinary(input , target , left , right){
  if (left > right) return -1;
  let mid = (right+left)/2;
  if(input[mid]==target) return mid;
  if(input[mid]>target) return searchBinary(input,target, mid + 1, right);
  else return searchBinary(input, target, left , mid - 1 );
}
module.exports = search
