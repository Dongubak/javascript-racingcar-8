<style>
  h1 { font-size: 34px; }
  h2 { font-size: 28px; margin-left: 20px; }
  h3 { font-size: 24px; margin-left: 40px; }
  h4 { font-size: 20px; margin-left: 60px; }
  h5 { font-size: 18px; margin-left: 80px; }
  p, li { font-size: 17px; margin-left: 45px; line-height: 1.6; }
  p1 {
    margin-left: 20px;
  }
  p2 {
    margin-left: 40px;
  }
  p3 {
    margin-left: 60px;
  }
  p4 {
    margin-left: 80px;
  }
  p5  {
    margin-left: 100px;
  }
  img { margin-left: 60px; }
</style>

# 우아한 테크코스 두번째 과제(자동차 경주)

## 목차
### 1. [순서도](#1-순서도)
### 2. [기능 목록](#2-기능-목록)
### 3. [단위 테스트](#3-단위-테스트-1)

---

## 순서도(수정)
### 입력 순서도
![alt text](/img/input_flow_lasted.png)

## 순서도(deprecated)
### 입력 순서도(deprecated)
![alt text](/img/input_flow_deprecated.png)

### 플레이 순서도
![alt text](play_flow_lasted.png)

### 입력 제약 사항
1. 사용자는 1 이상의 값을 입력하여 시뮬레이션을 할 수 있으며, 0 입력시 에러가 발생한다.
2. 사용자가 입력한 이름들 중 겹치는 이름이 존재해서는 안된다.
3. 사용자가 빈 문자열을 입력한 경우 에러가 발생한다.

## 기능 목록
### inputAndIsValidInput
#### 설명
이는 입력을 받은 뒤 검증하는 통합 모듈이다.
#### 단위 모듈
1. inputAndIsValidInput
   1. inputString
   2. parseInputString
      1. isNotEmptyString
      2. splitWithSeparator
   3. isValidNameArray
      1. isNotEmptyElement
      2. isNotOverFiveChar
      3. isNotDuplicateName
   4. inputNumber
   5. isValidInputNumber
      1. isNumber
      2. isNotNegative
      3. isNotZero

#### 1. inputString
<p4>사용자로부터 문자열을 입력받는다.</p1>

#### 2. parseInputString
<p4>사용자로부터 입력받은 문자열을 파싱한다.</p4>

##### A. isNotEmptyString
<p5>전달받은 문자열이 빈 문자열인지 검증한다.</p5>

##### B. splitWithSeparator
<p5>전달받은 문자열을 ,를 기준으로 분리한다.</p5>

#### 3. isValidNameArray
<p4>전달받은 이름 배열의 각 원소가 타당한지 검증한다.</p4>

##### A. isNotEmptyElement
<p5>각 원소 중 빈 문자열이 있는지 검증한다.</p5>

##### B. isNotOverFiveChar
<p5>각 원소가 5글자 이하의 이름인지 검증한다.</p5>

##### C. isNotDuplicateName
<p5>각 원소 중 어느 하나라도 다른 하나와 겹치는 이름이 존재하는지 검증한다.</p5>

#### 4. inputNumber
<p4>사용자로부터 시뮬레이션 할 횟수를 입력받는다.</p4>

#### 5. isValidInputNumber
<p4>사용자로부터 입력받은 숫자가 유효한지 검증한다.</p4>

##### A. isNumber
<p5>전달 받은 문자열이 숫자인지 검증한다</p5>

##### B. isNotNegative
<p5>전달받은 숫자가 음수인지 검증한다.</p5>

##### C. isNotZero
<p5>전달 받은 숫자가 0인지 검증한다.</p5>

### 3. 단위 테스트

#### isNotEmptyString
<p4>입력과 출력</p4><br />
<p4>'Jaspers,sanchez' / true</p4><br />
<p4>'' / false</p4>

#### splitWithSeparator
<p4>입력과 출력</p4><br />
<p4>'Jaspers,sanchez' / ['Jaspers', 'sanchez']</p4><br />
<p4>'Jaspers,sanchez,John' / ['Jaspers', 'sanchez', '
John']</p4><br />
<p4>'' / ['']</p4>

#### isNotEmptyElement
<p4>입력과 출력</p4><br />
<p4>['Jaspers','sanchez'] / true</p4><br />
<p4>['Jaspers','sanchez',''] / false</p4><br />
<p4>[''] / false</p4>

#### isNotOverFiveChar
<p4>입력과 출력</p4><br />
<p4>['Semi','Khang','John'] / true</p4><br />
<p4>['Jaspers','sanchez'] / false</p4><br />


#### isNotDuplicateName
<p4>입력과 출력</p4><br />
<p4>['Jaspers','sanchez'] / true</p4><br />
<p4>['Jaspers','sanchez','Jaspers'] / false</p4><br />

#### isNumber
<p4>입력과 출력</p4><br />
<p4>"-1" / true</p4><br />
<p4>"123" / true</p4><br / >
<p4>"a" / false</p4><br / >


#### isNotNegative
<p4>입력과 출력</p4><br />
<p4>-1 / false</p4><br />
<p4>1 / true</p4>

#### isNotZero
<p4>입력과 출력</p4><br />
<p4>1 / true</p4><br />
<p4>0 / false</p4>