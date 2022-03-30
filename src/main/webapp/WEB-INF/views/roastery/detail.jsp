<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<c:import url="../template/css_import.jsp"></c:import>
<style type="text/css">
label {
	margin: 10px;
}
</style>

<title>Insert title here</title>
</head>
<body>
	<c:import url="../template/header.jsp"></c:import>
		<input type="hidden" name="num" value="${roastery.num}">
		<input type="hidden" name="memberId" value="${member.id}">
		<fieldset>
			<img src="../resources/upload/roastery/${roastery.roasteryFileDTO.fileName}">
		</fieldset>
		<fieldset>
			<legend>로스터리 이름</legend>
			<input type="text" class="roastery" readonly="readonly" name="name" id="name" value="${roastery.name}">
		</fieldset>
		<fieldset>
			<legend>주소</legend>
			<input type="text" class="roastery" readonly="readonly" name="address" id="address" value="${roastery.address}">
		</fieldset>
		<fieldset>
			<legend>설명</legend>
			<textarea rows="15" cols="80" name="info" class="roastery" readonly="readonly" id="info">${roastery.name}</textarea>
		</fieldset>
		<button type="button" onclick="roasteryUpdate()" >로스터리 정보 수정</button>
		<script type="text/javascript">
			function roasteryUpdate() {
				location.href="./update";
			}
		</script>
</body>
</html>