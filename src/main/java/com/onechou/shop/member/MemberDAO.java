package com.onechou.shop.member;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.onechou.shop.favorite.CupnoteDTO;
import com.onechou.shop.favorite.FavoriteDTO;
import com.onechou.shop.roastery.RoasteryDTO;
import com.onechou.shop.roastery.RoasteryFileDTO;


@Repository
public class MemberDAO {
	
	@Autowired
	private SqlSession sqlSession;
	private final String NAMESPACE="com.onechou.shop.member.MemberDAO.";
	
	public MemberDTO login(MemberDTO memberDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE + "login", memberDTO);
	}
	
	public int addMember(MemberDTO memberDTO) throws Exception{
		return sqlSession.insert(NAMESPACE+"addMember", memberDTO);
	}
	
	public int addRoastery(RoasteryDTO roasteryDTO) throws Exception {
		return sqlSession.insert(NAMESPACE+"addRoastery", roasteryDTO);
	}
	
	public int addRoasteryFile(RoasteryFileDTO roasteryFileDTO) throws Exception {
		return sqlSession.insert(NAMESPACE+"addRoasteryFile", roasteryFileDTO);
	}
	
	public int addFavorite(FavoriteDTO favoriteDTO) throws Exception {
		return sqlSession.insert(NAMESPACE+"addFavorite", favoriteDTO);
	}
	
	public int addCupnote(CupnoteDTO cupnoteDTO) throws Exception {
		return sqlSession.insert(NAMESPACE+"addCupnote", cupnoteDTO);
	}
	
	public Long idDuplicateCheck(MemberDTO memberDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"idDuplicateCheck", memberDTO);
	}
	
	public Long nicknameDuplicateCheck(MemberDTO memberDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"nicknameDuplicateCheck", memberDTO);
	}
	
	public Long emailDuplicateCheck(MemberDTO memberDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"emailDuplicateCheck", memberDTO);
	}
	
	public Long phoneDuplicateCheck(MemberDTO memberDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"phoneDuplicateCheck", memberDTO);
	}
	
	public Long roasteryNameDuplicateCheck(RoasteryDTO roasteryDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"roasteryNameDuplicateCheck", roasteryDTO);
	}
	
	public MemberDTO genenalMemberMypage(MemberDTO memberDTO) throws Exception{
		return sqlSession.selectOne(NAMESPACE+"genenalMemberMypage", memberDTO);
	}
	
	public MemberDTO roasteryMemberMypage(MemberDTO memberDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"roasteryMemberMypage", memberDTO);
	}
	
	public MemberDTO memberDetail(MemberDTO memberDTO) throws Exception {
		return sqlSession.selectOne(NAMESPACE+"memberDetail", memberDTO);
	}
	
	public int update(MemberDTO memberDTO) throws Exception{
		return sqlSession.update(NAMESPACE+"update", memberDTO);
	}
	
	public int updatePw(MemberDTO memberDTO) throws Exception {
		return sqlSession.update(NAMESPACE+"updatePw", memberDTO);
	}
	

}
