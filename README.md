# Arrasate aplikazioa

Arrasate aplikazioa [angular](https://angular.io) eta [ionic](https://ionicframework.com/docs/) frameworkak
erabiliz garatu da.

Proiektua instalatu eta konfiguratzeko jarraitu argibide hauek:

## Dependentzia globalak

*OHARRA*: jadanik NodeJS, npm, ionic eta cordova instalatuta badituzu, ez dituzu berriz instalatu behar. Instalazio hau globala da eta sisteman instalatzen dira hainbat proiektutan erabili ahal izateko

1. Instalatu lehenengo [NodeJS](https://nodejs.org/en/download/) eta [npm](https://docs.npmjs.com/getting-started/installing-node)

2. Instalatu [ionic eta cordova](https://ionicframework.com/docs/intro/installation/)


## Aplikazioa deskargatu eta dependentziak instalatu

1. Klonatu errepositorio hau zure makinako karpeta batera:

 ```
 $ cd
 $ git clone git@gitlab.com:jakarregi/arrasateapp.git
 ```

2. Instalatu proiektuaren dependentziak:

 ```
 $ cd ~/arrasateapp
 $ npm install
 ```

3. Gehitu Android ingurunea:

Honetarako lehendabizi [Androiden SDK instalatu](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) eta konfiguratu behar da

```
$ cd ~/arrasateapp
$ ionic cordova platform add android
```

## Garapena egiteko modua

```
$ cd ~/arrasateapp
$ ionic serve --lab
```
