var bilby = require('bilby');
var curry = bilby.curry;


ZERO =
    curry                                                                                                                                                                                                                                                   (
        function (f, x)                                                                                                                                                                                                                                     {
            return x                                                                                                                                                                                                                                        ;})

SUCC =
    curry                                                                                                                                                                                                                                                   (
        function (n, f, x)                                                                                                                                                                                                                                  {
            return f ( n (f) (x) )                                                                                                                                                                                                                          ;})

PLUS =
    curry                                                                                                                                                                                                                                                   (
        function (n1, n2)                                                                                                                                                                                                                                   {
            return n1 (SUCC) (n2)                                                                                                                                                                                                                           ;})

TRUE =
    curry                                                                                                                                                                                                                                                   (
        function (x, y)                                                                                                                                                                                                                                     {
            return x                                                                                                                                                                                                                                        ;})

FALSE =
    curry                                                                                                                                                                                                                                                   (
        function (x, y)                                                                                                                                                                                                                                     {
            return y                                                                                                                                                                                                                                        ;})

IGNF =
    function (x)                                                                                                                                                                                                                                            {
        return FALSE
                                                                                                                                                                                                                                                            ;}
IGNZ =
    function (x)                                                                                                                                                                                                                                            {
        return ZERO                                                                                                                                                                                                                                         ;}

ISZERO =
    function (n)                                                                                                                                                                                                                                            {
        return n (IGNF) (TRUE)                                                                                                                                                                                                                              ;}

PREDA =
    curry                                                                                                                                                                                                                                                   (
        function (g, k)                                                                                                                                                                                                                                     {
            return  ISZERO
                        ( g (ONE) )
                    (k)
                    (SUCC (g (k)) )                                                                                                                                                                                                                         ;})

PRED =
    function (n)                                                                                                                                                                                                                                            {
        return n (PREDA) (IGNZ) (ZERO)                                                                                                                                                                                                                      ;}

SUB =
    curry                                                                                                                                                                                                                                                   (
        function (m, n)                                                                                                                                                                                                                                     {
            return n (PRED) (m)                                                                                                                                                                                                                             ;})

LT = curry                                                                                                                                                                                                                                                  (
    function (m, n)                                                                                                                                                                                                                                         {
        return  ISZERO
                    (SUB (SUCC (m)) (n))                                                                                                                                                                                                                    ;})

ONE   = curry                                                                                                                                                                                                                                                   (
    function (n, f, x)                                                                                                                                                                                                                                  {
        return f ( n (f) (x) )                                                                                                                                                                                                                          ;})
(curry                                                                                                                                                                                                                                                   (
        function (f, x)                                                                                                                                                                                                                                     {
            return x                                                                                                                                                                                                                                        ;})
)
TWO   = SUCC (ONE)
FOUR  = PLUS (TWO)  (TWO)
EIGHT = PLUS (FOUR) (FOUR)
SEVEN = PRED (EIGHT)


plusOne = function (acum) { return 1 + acum; }
evalNumber = function (n) { return n (plusOne) (0) }
evalBool = function (b) { return b (true) (false) ;}

plusOne = function (acum) { return 1 + acum; }

evalNumber = function (n) { return n (plusOne) (0) }
evalBool = function (b) { return b (true) (false) ;}


Y =
    function (f) {
        var aux =
            curry (
                function (self, x) {
                    return f ( self (self) ) (x) ;}
            );

        return aux (aux) ;}


var
    fib = Y (curry(
        function (f, n) {
            return  (LT (n) (TWO))
            (function (){ return n ;})
            (function (){ return PLUS
            (f  (SUB (n) (ONE)))
            (f  (SUB (n) (TWO)))                                                                                                                                    ;})
            ()                                                                                                                                                                                     ;}
    ))

result = evalNumber (fib (SEVEN))


K = curry (
    function (x, y) { return x; }
)

var fib2 = function (n) {
    var aux =
        curry (
            function (f, a, b) {
                return f (b) (PLUS (a) (b));
            }
        )
    return n (aux) (K) (ZERO) (ONE);
}

print = function (x) { console.log("Result: " + x); }
print (result)