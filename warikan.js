var manager_array = [0.5,0.4,0.3];

function Warikan(){
  var manager_burden = [];
  var manager_count = 0;
  var manager_check = document.getElementsByClassName("yakusyoku");
  var total = parseInt(document.getElementById("money_total").value);
  const const_total = total;
  var member = parseInt(document.getElementById("member_total").value);
  var per_person = document.getElementById("per_person");
  var manager = document.getElementById("manager");
  var fraction = 0;
  var manager_list = [];
  var member_result = "";
  var manager_result = "";
  document.getElementById("total").innerHTML = "TOTALは" + total + "円です。<br><br>";
  for(var i = 0; i < manager_check.length;i++){
    if(manager_check[i].checked){
      manager_burden[manager_count] = Math.floor(total * manager_array[i]);
      manager_list[manager_count] = manager_check[i].value;
      total = total - manager_burden[manager_count];
      manager_count++;
      member--;
    }
  }
  if(member < 0){
    swal("人数の設定が正しくありません");
    return;
  }
  if(isNaN(member) == true || isNaN(total) == true){
    swal("入力された値が不正です。");
    return;
  }
  fraction = total % member;
  if(fraction == 0){
    per_person.innerHTML = "1人あたりは"  + (total / member) + "円です";
    member_result = member_result + "1人あたりは" + (total / member) + "円です";
  }else{
    if(manager_burden.length == 0){
      per_person.innerHTML = fraction + "人は" + Math.floor(total / member + 1) + "円で<br>";
      member_result = fraction + "人は" + Math.floor(total / member + 1) + "円で<br>";
      per_person.innerHTML = per_person.innerHTML + (member - fraction) + "人は" + Math.floor(total / member)+ "円です<br>";
      member_result = member_result + (member - fraction) + "人は" + Math.floor(total / member)+ "円です<br>";
    }else{
      manager_burden[0] = manager_burden[0] + fraction;
      total = total - fraction;
      per_person.innerHTML = "1人あたりは" + (total / member) + "円です<br>";
      member_result = "1人あたりは" + (total / member) + "円です<br>";
    }
  }
  if(manager_burden.length == 0){
    manager.innerHTML = "重役の方はいません";
    manager_result = "重役の方はいません。";
  }else{
    manager.innerHTML = "重役" + manager_list.length + "人<br >";
    manager_result = "重役<br>";
    for(var i = 0; i < manager_burden.length; i++){
      manager_result = manager_result + manager_list[i] + "は" + manager_burden[i] + "です<br>";
      manager.innerHTML = manager.innerHTML + manager_list[i] + "は" + manager_burden[i] + "です<br>";
    }
  }
  Result(const_total,member,manager_result,member_result);
}

function Result(total,member_people,manager_result,member_result){
  swal({
    html: true,
    title: "割り勘",
    text:"合計金額は" + total + "です<br>" + manager_result + "<br>重役を抜いた総人数は　" + member_people + "人　です<br>" + member_result,
    confirmButtonText: "OK"
  });
}
