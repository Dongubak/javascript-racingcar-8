# 우아한 테크코스 두번째 과제(자동차 경주)

> ## 목차
> ### 1. [순서도](#1-순서도)
> ### 2. [클래스다이어그램](#클래스-다이어그램)
> ### 3. [기능 목록](#2-기능-목록)
> ### 4. [단위 테스트](#3-단위-테스트-1)
> ### 5. [기능 테스트](#기능-테스트)
> ### 6. [예외 테스트](#예외-테스트)

---

## 순서도(수정)
> ### 입력 순서도  
> ![alt text](/img/input_flow_lasted.png)

## 순서도(deprecated)
> ### 입력 순서도(deprecated)  
> ![alt text](/img/input_flow_deprecated.png)
>
> ### 플레이 순서도  
> ![alt text](/img/play_flow_lasted.png)

## 클래스 다이어그램
> ![alt text](/img/class_diagram.png)

### 입력 제약 사항
> 1. 사용자는 1 이상의 값을 입력하여 시뮬레이션을 할 수 있으며, 0 입력시 에러가 발생한다.  
> 2. 사용자가 입력한 이름들 중 겹치는 이름이 존재해서는 안된다.  
> 3. 사용자가 빈 문자열을 입력한 경우 에러가 발생한다.

---

## 기능 목록

### inputAndIsValidInput
> #### 설명  
> 이는 입력을 받은 뒤 검증하는 통합 모듈이다.
>
> #### 단위 모듈
> 1. inputAndIsValidInput  
>    1. inputString  
>    2. parseInputString  
>       1. isNotEmptyString  
>       2. splitWithSeparator  
>    3. isValidNameArray  
>       1. isNotEmptyElement  
>       2. isNotOverFiveChar  
>       3. isNotDuplicateName  
>    4. inputNumber  
>    5. isValidInputNumber  
>       1. isNumber  
>       2. isNotNegative  
>       3. isNotZero
>
> #### 1. inputString  
> 사용자로부터 문자열을 입력받는다.
>
> #### 2. parseInputString  
> 사용자로부터 입력받은 문자열을 파싱한다.  
> 
> ##### A. isNotEmptyString  
> 전달받은 문자열이 빈 문자열인지 검증한다.  
>
> ##### B. splitWithSeparator  
> 전달받은 문자열을 `,`를 기준으로 분리한다.
>
> #### 3. isValidNameArray  
> 전달받은 이름 배열의 각 원소가 타당한지 검증한다.
>
> ##### A. isNotEmptyElement  
> 각 원소 중 빈 문자열이 있는지 검증한다.  
>
> ##### B. isNotOverFiveChar  
> 각 원소가 5글자 이하의 이름인지 검증한다.  
>
> ##### C. isNotDuplicateName  
> 각 원소 중 어느 하나라도 다른 하나와 겹치는 이름이 존재하는지 검증한다.
>
> #### 4. inputNumber  
> 사용자로부터 시뮬레이션 할 횟수를 입력받는다.
>
> #### 5. isValidInputNumber  
> 사용자로부터 입력받은 숫자가 유효한지 검증한다.
>
> ##### A. isNumber  
> 전달 받은 문자열이 숫자인지 검증한다
>
> ##### B. isNotNegative  
> 전달받은 숫자가 음수인지 검증한다.
>
> ##### C. isNotZero  
> 전달 받은 숫자가 0인지 검증한다.

---

## 3-단위 테스트

### isNotEmptyString
> **입력과 출력**
>
> - `'Jaspers,sanchez'` / `true`  
> - `''` / `false`

### splitWithSeparator
> **입력과 출력**
>
> - `'Jaspers,sanchez'` / `['Jaspers', 'sanchez']`  
> - `'Jaspers,sanchez,John'` / `['Jaspers', 'sanchez', 'John']`  
> - `''` / `['']`

### isNotEmptyElement
> **입력과 출력**
>
> - `['Jaspers','sanchez']` / `true`  
> - `['Jaspers','sanchez','']` / `false`  
> - `['']` / `false`

### isNotOverFiveChar
> **입력과 출력**
>
> - `['Semi','Khang','John']` / `true`  
> - `['Jaspers','sanchez']` / `false`

### isNotDuplicateName
> **입력과 출력**
>
> - `['Jaspers','sanchez']` / `true`  
> - `['Jaspers','sanchez','Jaspers']` / `false`

### isNumber
> **입력과 출력**
>
> - `"-1"` / `true`  
> - `"123"` / `true`  
> - `"a"` / `false`

### isNotNegative
> **입력과 출력**
>
> - `-1` / `false`  
> - `1` / `true`

### isNotZero
> **입력과 출력**
>
> - `1` / `true`  
> - `0` / `false`

---

## 기능 테스트

### TC-01: 2명 · 1회 시도 · 단독 우승
> **이름**  
> `basic two players — pobi,woni / 1 — [4,3] — pobi wins`
>
> **입력**
>
> | 단계 | 값 |
> |---|---|
> | 이름 | `pobi,woni` |
> | 시도 횟수 | `1` |
>
> **모의 랜덤(mockRandoms 전달 배열)**  
> `[4, 3]`  
> 호출 순서: `pobi(4)`, `woni(3)`
>
> **기대 로그**
>
> ```bash
> pobi : -
> woni :
> 최종 우승자 : pobi
> ```

### TC-02: 3명 · 3회 시도 · 단독 우승
> **이름**  
> `three players — pobi,woni,jun / 3 — [4,3,4, 3,4,3, 4,4,4] — pobi wins`
>
> **입력**
>
> | 단계 | 값 |
> |---|---|
> | 이름 | `pobi,woni,jun` |
> | 시도 횟수 | `3` |
>
> **모의 랜덤(mockRandoms 전달 배열)**  
> `[4,3,4, 3,4,3, 4,4,4]`  
> 1턴: pobi(4), woni(3), jun(4)  
> 2턴: pobi(3), woni(4), jun(3)  
> 3턴: pobi(4), woni(4), jun(4)
>
> **기대 로그**
>
> ```bash
> pobi : -
> woni :
> jun  : -
>
> pobi : -
> woni : -
> jun  : -
>
> pobi : ---
> woni : --
> jun  : --
> 최종 우승자 : pobi
> ```

### TC-03: 3명 · 2회 시도 · 공동 우승
> **이름**  
> `tie winners — pobi,woni,jun / 2 — [4,4,3, 3,4,4] — pobi,woni win`
>
> **입력**
>
> | 단계 | 값 |
> |---|---|
> | 이름 | `pobi,woni,jun` |
> | 시도 횟수 | `2` |
>
> **모의 랜덤(mockRandoms 전달 배열)**  
> `[4,4,3, 3,4,4]`
>
> **기대 로그**
>
> ```bash
> pobi : -
> woni : -
> jun  :
>
> pobi : -
> woni : --
> jun  : -
> 최종 우승자 : woni, pobi
> ```
> *우승자 표기는 구현 정렬 규칙(입력순/사전순)에 맞추세요. 예시는 사전순.*

---

## 예외 테스트

### TC-04: 이름 입력 예외(빈 문자열)
> **이름**  
> `Invalid names - Input is empty - error`
>
> **입력**
>
> | 단계 | 값 |
> |---|---|
> | 이름 | `` (빈 문자열) |
>
> **모의 랜덤(mockRandoms 전달 배열)**  
> (사용되지 않음)
>
> **기대 결과**
>
> - `app.run()`이 `[ERROR] : Input is empty`를 포함한 메시지로 **reject** / 종료

### TC-05: 이름 입력 예외(5자 초과)
> **이름**  
> `Invalid names - Each name must be <= 5 characters - error`
>
> **입력**
>
> | 단계 | 값 |
> |---|---|
> | 이름 | `pobi,javaji` |
>
> **모의 랜덤(mockRandoms 전달 배열)**  
> (사용되지 않음)
>
> **기대 결과**
>
> - `app.run()`이 `[ERROR] : Each name must be <= 5 characters`를 포함한 메시지로 **reject** / 종료

### TC-06: 이름 입력 예외(중복)
> **이름**  
> `Invalid names - Duplicate name found - error`
>
> **입력**
>
> | 단계 | 값 |
> |---|---|
> | 이름 | `pobi,pobi` |
>
> **모의 랜덤(mockRandoms 전달 배열)**  
> (사용되지 않음)
>
> **기대 결과**
>
> - `app.run()`이 `[ERROR] : Duplicate name found`를 포함한 메시지로 **reject** / 종료

### TC-07: 이름 입력 예외(빈 문자열 포함)
> **이름**  
> `Invalid names - Empty name detected - error`
>
> **입력**
>
> | 단계 | 값 |
> |---|---|
> | 이름 | `pobi,` |
>
> **모의 랜덤(mockRandoms 전달 배열)**  
> (사용되지 않음)
>
> **기대 결과**
>
> - `app.run()`이 `[ERROR] : Empty name detected`를 포함한 메시지로 **reject** / 종료

### TC-08: 시도 횟수 예외(숫자 아님)
> **이름**  
> `Invalid trials - input is none a number - error`
>
> **입력**
>
> | 단계 | 값 |
> |---|---|
> | 이름 | `pobi,woni` |
> | 시도 횟수 | `a` |
>
> **모의 랜덤(mockRandoms 전달 배열)**  
> (사용되지 않음)
>
> **기대 결과**
>
> - `app.run()`이 `[ERROR] : input is none a number`를 포함한 메시지로 **reject** / 종료

### TC-09: 시도 횟수 예외(음수 입력)
> **이름**  
> `Invalid trials - number must be positive - error`
>
> **입력**
>
> | 단계 | 값 |
> |---|---|
> | 이름 | `pobi,woni` |
> | 시도 횟수 | `-1` |
>
> **모의 랜덤(mockRandoms 전달 배열)**  
> (사용되지 않음)
>
> **기대 결과**
>
> - `app.run()`이 `[ERROR] : number must be positive`를 포함한 메시지로 **reject** / 종료

### TC-10: 시도 횟수 예외(0 입력)
> **이름**  
> `Invalid trials - number cannot be zero - error`
>
> **입력**
>
> | 단계 | 값 |
> |---|---|
> | 이름 | `pobi,woni` |
> | 시도 횟수 | `0` |
>
> **모의 랜덤(mockRandoms 전달 배열)**  
> (사용되지 않음)
>
> **기대 결과**
>
> - `app.run()`이 `[ERROR] : number cannot be zero`를 포함한 메시지로 **reject** / 종료