<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<c:import url="../template/css_import.jsp"></c:import>
	<link rel="stylesheet" href="../resources/css/payment/add.css">

	<title>OneChou - 결제정보 입력</title>
</head>
<body>
	<c:import url="../template/header.jsp"></c:import>
	
	<div class="container my-5">
		<div class="text-center">
			<h3>결제정보를 입력해주세요</h3>
		</div>
		<form action="./addResult" id="addForm" method="post">
			<div class="row border border-2 rounded text-center mt-5">
				<div class="pt-3 pb-3">
					<h3>결제 상품 정보</h3>
				</div>
				<div>
					<table class="table table-bordered text-center align-middle">
						<thead>
							<tr>
							<th scope="col">상품사진</th>
							<th scope="col">상품정보</th>
							<th scope="col">선택옵션</th>
							<th scope="col">선택수량</th>
							<th scope="col">배송비</th>
							<th scope="col">가격</th>
							</tr>
						</thead>
						<tbody>
							<c:forEach items="${cartDTOs}" var="cartDTO">
								<tr>
									<td><img class="productImg" src="../resources/upload/product/${cartDTO.productDTO.productFileDTO.fileName}" alt=""></td>
									<td>
										<div class="d-flex flex-column">
											<div class="fw-bold">${cartDTO.productDTO.roasteryName}</div>
											<div class="fw-bold">${cartDTO.productDTO.name}</div>
											<div>${cartDTO.productDTO.price}원</div>
										</div>
									</td>
									<td>${cartDTO.productOptionDTO.optionName}(+${cartDTO.productOptionDTO.addPrice})</td>
									<td>${cartDTO.amount}개</td>
									<c:choose>
										<c:when test="${cartDTO.productDTO.freeDelivery == 0 || cartDTO.perPrice < cartDTO.productDTO.freeDelivery}">
											<td>${cartDTO.productDTO.deliveryFee}원</td>
										</c:when>
										<c:otherwise>
											<td>무료배송</td>
										</c:otherwise>
									</c:choose>
									<td>${cartDTO.perPrice}원</td>
									<input type="hidden" name="perPrices" class="perPrices" value="${cartDTO.perPrice}">
									<input type="hidden" name="amounts" value="${cartDTO.amount}">
									<input type="hidden" name="productNums" value="${cartDTO.productNum}">
									<input type="hidden" name="optionNums" value="${cartDTO.optionNum}">
									<input type="hidden" name="nums" value="${cartDTO.num}">
									<input type="hidden" name="roasteryNums" value="${cartDTO.productDTO.roasteryNum}">
								</tr>		
							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
			<div class="row row-cols-2 border border-2 rounded text-center mt-5 mb-5">
				<div class="col-8 border-end">
					<div class="mt-3 mb-3">
						<h3>배송 정보 입력</h3>
					</div>
					<div>
						<div class="input-group p-3">
							<span class="input-group-text">받는사람</span>
							<input type="text" name="recipient" id="recipient" class="form-control">
						</div>
						<div class="input-group p-3">
							<span class="input-group-text">받는사람 연락처</span>
							<input type="number" name="recipientPhone" id="recipientPhone" class="form-control" placeholder="-를 제외한 숫자만 입력해주세요.">
						</div>
						<div class="input-group p-3">
							<span class="input-group-text">배송지 주소</span>
							<input type="text" name="address" id="address" class="form-control">
						</div>
						<div class="input-group p-3 pb-5">
							<span class="input-group-text">배송 메모</span>
							<input type="text" name="memo" id="memo" class="form-control">
						</div>
						
					</div>
				</div>
				<div class="col-4">
					<div class="mt-3 mb-3">
						<h3>결제 정보 입력</h3>
					</div>
					<div class="input-group p-3">
						<select class="form-select" name="method" id="methodSelect">
							<option value="no">결제방식을 선택해주세요</option>
							<option value="1">카드결제</option>
						</select>
					</div>
				</div>
				<div class="col-12 border-top">
					<div class="mt-3 mb-3">
						<h3>최종결제정보</h3>
					</div>
					<div class="d-flex justify-content-center m-3">
						<ul class="resultList list-group">
							<li class="list-group-item">
								<div class="ms-2 me-auto">
								<div class="fw-bold">최종결제가격</div>
								<input type="hidden" name="totalPrice" id="totalPrice">
								<div id="totalPriceResult"></div>
								</div>
							</li>
							<li class="list-group-item">
								<div class="ms-2 me-auto">
								<div class="fw-bold">결제방식</div>
								<div id="methodResult"></div>
								</div>
							</li>
						</ul>
					</div>
					<div class="m-3">
						<button id="paymentBtn" type="button" class="btn btn-secondary">결제하기</button>
					</div>
				</div>
			</div>
		</form>
	</div>

	<c:import url="../template/footer.jsp"></c:import>
	
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	<script src="../resources/js/payment/add.js"></script>
</body>
</html>