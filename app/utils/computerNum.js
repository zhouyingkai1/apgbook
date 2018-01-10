function computerNum (num) {
  if(Number(num) < 10000){
    return num
  }
  var numstr = String(num)
  var first = numstr.substring(0,numstr.length-4)
  var sec = numstr.substring(numstr.length-4,numstr.length)
  if(Number(sec)> 5000){
    first = Number(first) + 1
  }
  return `${first}万`
}
export default computerNum