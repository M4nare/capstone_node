# capstone_node

캡스톤 프로젝트, '오늘어때'에 사용했던 node.js

보안을 전혀 고려하지 않고 제작했기 때문에 해당 프로젝트가 다시 진행이 되었을 경우, token 방식을 이용하여 보안에 신경 쓸 예정 

route 부터 보안까지 신경 써야 할 부분들을 신경을 못 쓴게 너무 크다.  ~~대충 짠거겠지~~

2021/08/29 모듈화 진행

그것과 별개로 sql 쿼리와 관련된 알고리즘 하나는 잘 한거 같긴하다.



|          API          | 방식 |                  주소                 |
|:---------------------:|:----:|:-------------------------------------:|
| 사용자 API            | POST | project.mintpass.kr:3000/login        |
| 카테고리 API          | POST | project.mintpass.kr:3000/tag          |
| 카테고리 랜덤 API       |  POST | project.mintpass.kr:3000/random          |
| 장소 세부정보 API     |  GET | project.mintpass.kr:3000/location/:id |
| 평점 추가 및 수정 API | PUT | project.mintpass.kr:3000/rating       |
| 업체 이미지 API       |  GET | img.mintpass.kr/api/:id                   |
| 사용자별 LIST API   |  GET | project.mintpass.kr:3000/list/:userid  |
| 사용자별 LIST API   |  POST/DELETE | project.mintpass.kr:3000/list  |


**POST**

사용자 API

{

	"user": "value"

}

카테고리 API

{

	"tag":"value"

}

랜덤 API

{

	"weather":"value"

}

// 날씨 레벨 3이상 해당하는 음식점 하나를 랜덤으로 보여줌


평점 추가 및 수정 API

{

	"id": value,

	"user": "value",

	"rating": "value"

}

**POST/DELETE**

사용자 LISTAPI

{

	"id" : value,

	"userid" : "value"

}
