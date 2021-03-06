// 공통적으로 필요한 데이터들 
const cartBtn = document.querySelector('#cartBtn'); // 장바구니 담기 버튼
const optionNum = document.querySelector('#optionNum'); // option을 담고있는 select 태그
const options = document.querySelectorAll('.options'); // option을 담고있는 select 태그 내의 option태그들
const amount = document.querySelector('#amount'); // 상품수량을 담고있는 select 태그
const price = document.querySelector('#price'); // 해당 상품의 가격정보를 담고있는 input태그
const perPrice = document.querySelector('#perPrice'); // 최종적으로 value 속성에 담아야 할 가격 input태그
const memberId = document.querySelector('#memberId');
const productNum = document.querySelector('#productNum');
const deliveryFee = document.querySelector('#deliveryFee');
const freeDelivery = document.querySelector('#freeDelivery');
const paymentBtn = document.querySelector('#paymentBtn');

const showOption = document.querySelector('#showOption'); // 선택한 옵션을 보여주기 위함
const showAmount = document.querySelector('#showAmount'); // 선택한 수량을 보여주기 위함
const showPerPrice = document.querySelector('#showPerPrice'); // 최종 가격을 보여주기 위함

let productPrice = 0; // 상품가격 + 옵션가격
let perPriceResult = 0; // (상품가격 + 옵션가격) * 상품수량 -> 최종적으로 파라미터로 넘겨야 할 값

let optionCheck = false; // 구매자가 옵션을 체크했는지 판단
let amountCheck = false; // 구매자가 수량을 체크했는지 판단

const cartFrm = document.querySelector('#cartFrm'); // 장바구니 추가 요청으로 가는 폼태그

// --- 리뷰 비동기 방식 처리 ---
const reviewSection = document.querySelector('#reviewSection');
let reviewPage = 1;

getReviewList(reviewPage);

function getReviewList(reviewPage) {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "../review/list?productNum="+productNum.value+"&page="+reviewPage)

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            reviewSection.innerHTML = this.responseText.trim();
        }
    }
}

let ratingCheck = false;
let contentsCheck = true;
let ratingValue = 0;

reviewSection.addEventListener("click", function(event){
    //리뷰 삭제
    if(event.target.classList.contains('reviewDeleteBtn')) {
        if(!confirm('삭제하시겠습니까?')) {
            return;
        }

        const reviewNum = event.target.getAttribute("data-num");
        
        const xhttp = new XMLHttpRequest();

        xhttp.open("POST", "../review/delete");
    
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.send("num="+reviewNum);
    
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                let result = this.responseText.trim();

                if(result == 1) {
                    alert('리뷰 삭제에 성공했습니다.');
                    getReviewList(reviewPage);
                } else {
                    alert('리뷰 삭제에 실패했습니다.\n다시 시도해주세요.')
                }
            }
        }
    }

    // 별점 검증 라디오 박스라 클릭이벤트가 일어나기만 해도 값이 입력된 것임
    if(event.target.classList.contains('rating')){
        ratingValue = event.target.value;
        ratingCheck = true;
    }

    // 리뷰 수정 확인 - 코드 순서가 리뷰 수정버튼을 누르는 것 보다 위에 있어야 함
    if(event.target.classList.contains('reviewConfirmBtn')) {
        if(!confirm('수정하시겠습니까?')){
            return;
        }

        const reviewNum = event.target.getAttribute('data-num');
        const updateReviewContents = document.querySelector('#reviewTextArea'+reviewNum).value;
        if (updateReviewContents == '') {
            contentsCheck = false;
        } else {
            contentsCheck = true;
        }

        if(ratingCheck && contentsCheck) {
            const xhttp = new XMLHttpRequest();
            
            xhttp.open('POST', "../review/update");

            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhttp.send('num='+reviewNum+'&contents='+updateReviewContents+'&rating='+ratingValue);

            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200) {
                    let result = this.responseText.trim();
    
                    if(result == 1) {
                        alert('리뷰 수정에 성공했습니다.');
                        getReviewList(reviewPage);
                        ratingCheck = false;
                    } else {
                        alert('리뷰 수정에 실패했습니다.\n다시 시도해주세요.')
                        ratingCheck = false;
                    }
                }
            }
        }
    }

    // 리뷰 수정
    if(event.target.classList.contains('reviewUpdateBtn')){


        const reviewUpdateBtn = event.target;
        const reviewNum = reviewUpdateBtn.getAttribute("data-num");

        
        // --- 내용 입력폼 생성 후 대입 ---
        const inputGroupDiv = document.createElement('div');
        inputGroupDiv.classList.add('input-group');
        
        const inputGroupText = document.createElement('span');
        inputGroupText.classList.add('input-group-text');
        inputGroupText.innerHTML = "리뷰내용수정"
        
        const inputTextArea = document.createElement('textarea');
        inputTextArea.classList.add('form-control');
        inputTextArea.setAttribute('id', 'reviewTextArea'+reviewNum);
        
        
        const contentsTd = document.querySelector('#contents'+reviewNum);
        
        let originalReview = contentsTd.innerHTML;
        contentsTd.innerHTML = "";
        inputTextArea.value = originalReview;

        inputGroupDiv.append(inputGroupText);
        inputGroupDiv.append(inputTextArea);
        contentsTd.append(inputGroupDiv);

        // --- 별점 입력폼 생성 ---

        const ratingDiv = document.createElement('div');
        ratingDiv.setAttribute('id', 'myform');

        const ratingText = document.createElement('div');
        ratingText.classList.add('text-center');
        ratingText.innerHTML = "별점수정";

        const radio1 = document.createElement('input');
        radio1.classList.add('rating');
        radio1.setAttribute('type', 'radio');
        radio1.setAttribute('value', '5');
        radio1.setAttribute('id', 'rate1');
        
        const radio2 = document.createElement('input');
        radio2.classList.add('rating');
        radio2.setAttribute('type', 'radio');
        radio2.setAttribute('value', '4');
        radio2.setAttribute('id', 'rate2');
        
        const radio3 = document.createElement('input');
        radio3.classList.add('rating');
        radio3.setAttribute('type', 'radio');
        radio3.setAttribute('value', '3');
        radio3.setAttribute('id', 'rate3');
        
        const radio4 = document.createElement('input');
        radio4.classList.add('rating');
        radio4.setAttribute('type', 'radio');
        radio4.setAttribute('value', '2');
        radio4.setAttribute('id', 'rate4');
        
        const radio5 = document.createElement('input');
        radio5.classList.add('rating');
        radio5.setAttribute('type', 'radio');
        radio5.setAttribute('value', '1');
        radio5.setAttribute('id', 'rate5');

        const label1 = document.createElement('label');
        label1.setAttribute('for', 'rate1');
        label1.innerHTML = "⭐";

        const label2 = document.createElement('label');
        label2.setAttribute('for', 'rate2');
        label2.innerHTML = "⭐";

        const label3 = document.createElement('label');
        label3.setAttribute('for', 'rate3');
        label3.innerHTML = "⭐";

        const label4 = document.createElement('label');
        label4.setAttribute('for', 'rate4');
        label4.innerHTML = "⭐";

        const label5 = document.createElement('label');
        label5.setAttribute('for', 'rate5');
        label5.innerHTML = "⭐";


        ratingDiv.append(ratingText);
        ratingDiv.append(radio1);
        ratingDiv.append(label1);
        ratingDiv.append(radio2);
        ratingDiv.append(label2);
        ratingDiv.append(radio3);
        ratingDiv.append(label3);
        ratingDiv.append(radio4);
        ratingDiv.append(label4);
        ratingDiv.append(radio5);
        ratingDiv.append(label5);

        const ratingTd = document.querySelector('#rating'+reviewNum);
        ratingTd.innerHTML = "";
        ratingTd.append(ratingDiv);

        reviewUpdateBtn.innerHTML = "수정하기";    

        reviewUpdateBtn.classList.replace('reviewUpdateBtn', 'reviewConfirmBtn');
    }

    // 페이징 처리
    if(event.target.classList.contains('page-link')){
        reviewPage = event.target.getAttribute('data-page'); // page 전역변수에 page값을 넣어놓음
        // 나중에 리뷰 삭제, 리뷰 수정을 하더라도 요청을 보낼 때 해당 전역변수를 인자값으로 주면 page가 유지됨
        getReviewList(reviewPage);
    }

})


// --- 질문 비동기 방식 처리 ---
const qnaSection = document.querySelector('#qnaSection');
let qnaPage = 1;

getQnaList(qnaPage);

function getQnaList(qnaPage) {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "../qna/list?num="+productNum.value+"&page="+qnaPage);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            qnaSection.innerHTML = this.responseText.trim();
        }
    }

}

qnaSection.addEventListener("click", function(event){
    // 질문 등록
    if(event.target.classList.contains('qnaAddBtn')) {
        const qnaContents = document.querySelector('#qnaContents');
        const memberNickname = document.querySelector('#memberNickname');

        let qnaContentsCheck = false;
        if(qnaContents.value != '') {
            qnaContentsCheck = true;
        }

        const xhttp = new XMLHttpRequest();

        xhttp.open("POST", "../qna/add")

        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.send("contents="+qnaContents.value+"&memberId="+memberId.value+"&writer="+memberNickname.value+"&productNum="+productNum.value);

        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                let result = this.responseText.trim();
                if(result > 0) {
                    alert('질문 등록에 성공했습니다.');
                    getQnaList(qnaPage);
                } else {
                    alert('질문 등록에 실패했습니다.\n다시 시도해주세요.');
                }
            }
        }
    }

    // 질문 삭제
    if(event.target.classList.contains('qnaDeleteBtn')) {
        if(!confirm('삭제하시겠습니까?')){
            return;
        }
        
        const qnaNum = event.target.getAttribute('data-num');

        const xhttp = new XMLHttpRequest();

        xhttp.open("POST", "../qna/delete");
        
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.send('num='+qnaNum);

        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                let result = this.responseText.trim();
                if(result > 0) {
                    alert('질문 삭제에 성공했습니다.');
                    getQnaList(qnaPage);
                } else {
                    alert('질문 삭제에 실패했습니다.\n다시 시도해주세요.');
                }
            }
        }
    }

    // 질문 수정
    if(event.target.classList.contains('qnaUpdateBtn')) {
        
        const qnaNum = event.target.getAttribute('data-num');
        const isReply = event.target.getAttribute('data-reply'); // 1이면 답글, 0이면 부모글임

        const qnaContentsTd = document.querySelector('#qnaContents'+qnaNum);
        let originalQna = "";
        if(isReply == 1) { // 답글 표시인 └─── 를 없애야 함
            originalQna = qnaContentsTd.innerHTML.trim().substring(4).trim();
            // └─── 가 4칸이라 4칸 뒤부터 끝까지를 추출, 한번 더 공백 제거한 값이 실제 원본글 데이터임
        } else {
            originalQna = qnaContentsTd.innerHTML.trim(); // 부모글이라면 그냥 공백제거만 하면 원본글 데이터임
        }
        
        console.log(originalQna);
        qnaContentsTd.innerHTML = "";

        const inputGroupDiv = document.createElement('div');
        inputGroupDiv.classList.add('input-group');
        
        const inputGroupText = document.createElement('span');
        inputGroupText.classList.add('input-group-text');
        inputGroupText.innerHTML = "질문내용수정"
        
        const inputTextArea = document.createElement('textarea');
        inputTextArea.classList.add('form-control');
        inputTextArea.setAttribute('id', 'qnaTextArea'+qnaNum);
        
        inputTextArea.value = originalQna;

        inputGroupDiv.append(inputGroupText);
        inputGroupDiv.append(inputTextArea);
        qnaContentsTd.append(inputGroupDiv);

        // 입력 폼에서 blur 이벤트가 발생 시 수정 요청을 보냄
        const qnaTextArea = document.querySelector('#qnaTextArea'+qnaNum);
        qnaTextArea.addEventListener("blur", function(){
            if(qnaTextArea.value == ''){
                alert('질문 내용을 입력해주세요.');
                return;
            }
            
            if(!confirm('수정하시겠습니까?')){
                return
            }
    
            const xhttp = new XMLHttpRequest();

            xhttp.open("POST", "../qna/update");
            
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhttp.send('num='+qnaNum+"&contents="+qnaTextArea.value);

            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200) {
                    let result = this.responseText.trim();
                    if(result > 0) {
                        alert('질문 수정에 성공했습니다.');
                        getQnaList(qnaPage);
                    } else {
                        alert('질문 수정에 실패했습니다.\n다시 시도해주세요.');
                    }
                }
            }
        })
    }

    // 페이징 처리
    if(event.target.classList.contains('page-link')){
        qnaPage = event.target.getAttribute('data-page');
        getQnaList(qnaPage);
    }

    // 답글 숨김처리 (코드 순서가 답글 요청보다 위에 있어야 함)
    if(event.target.classList.contains('replyHideBtn')){
        let parentQnaNum = event.target.getAttribute('data-num');
        const replyListSection = document.querySelector('#replyListSection'+parentQnaNum);

        replyListSection.innerHTML="";
    }

    // 답글 요청
    if(event.target.classList.contains('replyBtn')){
        let parentQnaNum = event.target.getAttribute('data-num');
        const replyListSection = document.querySelector('#replyListSection'+parentQnaNum);

        const xhttp = new XMLHttpRequest();

        xhttp.open("GET", "../qna/replyList?num="+parentQnaNum);
    
        xhttp.send();
    
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                let result = this.responseText.trim();

                if(result == '0') {
                    alert('답글이 없습니다!');
                } else {
                    replyListSection.innerHTML = result;
                    event.target.classList.replace('replyBtn', 'replyHideBtn'); 
                    event.target.innerHTML = "답글닫기";
                }
            }
        }
    }

    // 숨김 처리 이후 버튼 클래스명 변경하기 
    // 답글 숨김처리하는 부분에 같이 하면 답글을 닫자마자 다시 답글 보기버튼 클릭이벤트가 발생
    // 코드의 순서가 이렇게 되어야 함
    if(event.target.classList.contains('replyHideBtn')){
        event.target.classList.replace('replyHideBtn', 'replyBtn'); 
        event.target.innerHTML = "답글보기";
    }
})

// 장바구니, 바로결제 처리

optionNum.addEventListener("change", function() {

    // 유효 옵션을 골랐는지 판단
    if (optionNum.value == 'no') {
        optionCheck = false;
        showOption.innerHTML = "";
        showPerPrice.innerHTML = "";
        return;
    } else {
        optionCheck = true;
    }

    let opNum = optionNum.value; // 선택한 옵션의 번호를 저장
    let opHtml = "";

    for(let o of options) {
        if(o.value == opNum) { // 만약의 선택한 옵션의 번호와 옵션들 중에서 value의 값이 같다면
            opHtml = o.innerHTML; // 해당 <option> 요소 안의 HTML을 opHtml 변수에 대입
        }
    }
    // 해당 HTML의 공백 제거 후 :를 기준으로 파싱 -> 배열 생성, 맨 마지막 값이 가격임으로 역으로 바꾼 후 [0]번째 인덱스 반환
    let addPrice = opHtml.replace(/(\s*)/g,"").split(':').reverse()[0];
    
    // 상품가격 + 옵션가격 구하기
    productPrice = price.value*1 + addPrice*1;

    // 선택한 옵션을 브라우저상에 표시
    showOption.innerHTML = opHtml

    // 유효한 옵션과 수량을 골랐다면
    if(optionCheck && amountCheck) {
        // 선택한 옵션과 수량을 토대로 계산 후 파라미터로 넘기는 input태그에 대입

        let amountPrice = (productPrice * amount.value)*1 // 상품가 * 수량
        if(freeDelivery.value*1 == 0) {
            perPriceResult = amountPrice + deliveryFee.value*1;
        } else {
            if(amountPrice < freeDelivery.value*1) {
                perPriceResult = amountPrice + deliveryFee.value*1;
            } else {
                perPriceResult = amountPrice;
            }
        }
        perPrice.value = perPriceResult;
        showPerPrice.innerHTML = "총 가격 : " + perPriceResult;
    }
})

amount.addEventListener("change", function() {

    // 유효 수량을 골랐는지 판단
    if (amount.value == 'no') {
        amountCheck = false;
        showAmount.innerHTML = "";
        showPerPrice.innerHTML = "";
        return;
    } else {
        amountCheck = true;
    }

    // 선택한 수량 브라우저상에 표시
    showAmount.innerHTML = "선택수량 : " + amount.value;

    // 유효한 옵션과 수량을 골랐다면
    if(optionCheck && amountCheck) {
        // 선택한 옵션과 수량을 토대로 계산 후 파라미터로 넘기는 input태그에 대입

        let amountPrice = (productPrice * amount.value)*1 // 상품가 * 수량
        if(freeDelivery.value*1 == 0) {
            perPriceResult = amountPrice + deliveryFee.value*1;
        } else {
            if(amountPrice < freeDelivery.value*1) {
                perPriceResult = amountPrice + deliveryFee.value*1;
            } else {
                perPriceResult = amountPrice;
            }
        }
        perPrice.value = perPriceResult;
        showPerPrice.innerHTML = "총 가격 : " + perPriceResult;
    }
})

cartBtn.addEventListener("click", function(){
    if(memberId.value == "") {
        if(!confirm('로그인이 필요합니다. \n로그인 하시겠습니까?')){
            alert('회원만 장바구니에 추가가능합니다');
            return;
        } else {
            location.href = "../member/login";
            return;
        }
    }

    if(optionCheck && amountCheck) {
        const xhttp = new XMLHttpRequest();

        xhttp.open("POST", "../cart/add");

        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.send("amount="+amount.value+"&perPrice="+perPrice.value+"&memberId="+memberId.value+"&productNum="+productNum.value+"&optionNum="+optionNum.value);

        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let result = this.response.trim();
                if(result != '0') {
                    if(confirm('장바구니에 등록되었습니다.\n 장바구니로 이동하시겠습니까?')) {
                        window.location.href="../cart/index";
                    }
                } else {
                    alert('장바구니 등록에 실패했습니다. \n 다시 시도해 주세요.');
                }
            }
        }

        optionCheck = false;
        amountCheck = false;
        showOption.innerHTML = "";
        showAmount.innerHTML = "";
        showPerPrice.innerHTML = "";

    } else if(!optionCheck) {
        alert("상품 옵션을 확인하세요.");
        optionNum.focus();
    } else {
        alert("상품 수량을 확인하세요.");
        amount.focus();
    }
})

const cartNum = document.querySelector('#cartNum');
const payForm = document.querySelector('#payForm');

paymentBtn.addEventListener("click", function(){
    if(memberId.value == "") {
        if(!confirm('로그인이 필요합니다. \n로그인 하시겠습니까?')){
            alert('회원만 구매 가능합니다');
            return;
        } else {
            location.href = "../member/login";
            return;
        }
    }

    if(optionCheck && amountCheck) {

        const xhttp = new XMLHttpRequest();

        xhttp.open("POST", "../cart/add");

        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.send("amount="+amount.value+"&perPrice="+perPrice.value+"&memberId="+memberId.value+"&productNum="+productNum.value+"&optionNum="+optionNum.value);

        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let result = this.response.trim();
                if(result != '0') {
                    
                    cartNum.value = result;
                    payForm.submit();
                
                } else {
                    alert('바로 결제에 실패했습니다. \n 다시 시도해 주세요.');
                }
            }
        }

    } else if(!optionCheck) {
        alert("상품 옵션을 확인하세요.");
        optionNum.focus();
    } else {
        alert("상품 수량을 확인하세요.");
        amount.focus();
    }
})