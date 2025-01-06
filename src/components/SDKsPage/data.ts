import js from './images/js.svg';
import java from './images/java.svg';
import python from './images/python.svg';
import react from './images/react.svg';
import csharp from './images/csharp.svg';
import go from './images/go.svg';
import nodejs from './images/nodejs.svg';
import ruby from './images/ruby.svg';
import swift from './images/swift.svg';
import objectivec from './images/objectivec.svg';
import flutter from './images/flutter.svg';
import php from './images/php.svg';
import laravel from './images/laravel.svg';
import android from './images/android.svg';
import kotlin from './images/kotlin.svg';
import unity from './images/unity.svg';
import xamarin from './images/xamarin.svg';
import nativescript from './images/nativescript.svg';
import cordova from './images/cordova.svg';
import clojure from './images/clojure.svg';
import scala from './images/scala.svg';

export const data = {
  hero: {
    title: 'Available SDKs',
    subtitle: "Ably's SDKs provide a consistent and idiomatic API across a variety of supported platforms.",
  },
  tabs: {
    channels: {
      text: "Choose from the following list of SDKs to build an application using the Pub/Sub product. Click 'Setup' for instructions on getting started with an SDK, or view its source repository for a full list of the platforms it supports.",
      cards: [
        {
          title: 'JavaScript',
          text: 'Ably SDK for JavaScript.',
          image: { src: js, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-js',
          setupLink: '/getting-started/setup?lang=javascript',
        },
        {
          title: 'Java',
          text: 'Ably SDK for Java.',
          image: { src: java, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-java',
          setupLink: '/getting-started/setup?lang=java',
        },
        {
          title: 'Python',
          text: 'Ably SDK for Python.',
          image: { src: python, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-python',
          setupLink: '/getting-started/setup?lang=python',
        },
        {
          title: 'React',
          text: 'Ably React Hooks package.',
          image: { src: react, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-js',
          setupLink: '/getting-started/react',
        },
        {
          title: 'C#.NET',
          text: 'Ably SDK for C#.NET.',
          image: { src: csharp, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-dotnet',
          setupLink: '/getting-started/setup?lang=csharp',
        },
        {
          title: 'Go',
          text: 'Ably SDK for Go.',
          image: { src: go, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-go',
          setupLink: '/getting-started/setup?lang=go',
        },
        {
          title: 'Node.js',
          text: 'Ably SDK for Node.js.',
          image: { src: nodejs, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-js',
          setupLink: '/getting-started/setup?lang=nodejs',
        },
        {
          title: 'Ruby',
          text: 'Ably SDK for Ruby.',
          image: { src: ruby, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-ruby',
          setupLink: '/getting-started/setup?lang=ruby',
        },
        {
          title: 'Swift',
          text: 'Ably SDK for Swift.',
          image: { src: swift, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-cocoa',
          setupLink: '/getting-started/setup?lang=swift',
        },
        {
          title: 'Objective-C',
          text: 'Ably SDK for Objective-C.',
          image: { src: objectivec, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-cocoa',
          setupLink: '/getting-started/setup?lang=objc',
        },
        {
          title: 'Flutter',
          text: 'Ably SDK for Flutter.',
          image: { src: flutter, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-flutter',
          setupLink: '/getting-started/setup?lang=flutter',
        },
        {
          title: 'PHP',
          text: 'Ably SDK for PHP.',
          image: { src: php, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-php',
          setupLink: '/getting-started/setup?lang=php',
        },
        {
          title: 'PHP Laravel',
          text: 'Ably SDK for PHP Laravel.',
          image: { src: laravel, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-php#laravel-realtime-broadcasting',
          setupLink: 'https://github.com/ably/ably-php#laravel-realtime-broadcasting',
        },
        {
          title: 'Android',
          text: 'Ably SDK for Android.',
          image: { src: android, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-java',
          setupLink: '/getting-started/setup?lang=java',
        },
        {
          title: 'Kotlin',
          text: 'Ably SDK for Kotlin.',
          image: { src: kotlin, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-java',
          setupLink: '/getting-started/setup?lang=java',
        },
        {
          title: 'Unity',
          text: 'Ably SDK for Unity.',
          image: { src: unity, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-dotnet',
          setupLink: 'https://github.com/ably/ably-dotnet/blob/main/unity/README.md',
        },
        {
          title: 'Xamarin',
          text: 'Ably SDK for Xamarin.',
          image: { src: xamarin, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-dotnet',
          setupLink: '/getting-started/setup?lang=csharp',
        },
        {
          title: 'NativeScript',
          text: 'Ably SDK for NativeScript.',
          image: { src: nativescript, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-js-nativescript',
          setupLink: 'https://github.com/ably/ably-js-nativescript#how-to-use-this-library',
        },
        {
          title: 'React Native',
          text: 'Ably SDK for React Native.',
          image: { src: react, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-js',
          setupLink: '/getting-started/react',
        },
        {
          title: 'Cordova',
          text: 'Ably SDK for Cordova.',
          image: { src: cordova, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-js',
          setupLink: '/getting-started/setup?lang=javascript',
        },
        {
          title: 'Clojure',
          text: 'Ably SDK for Clojure.',
          image: { src: clojure, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-java',
          setupLink: '/getting-started/setup?lang=java',
        },
        {
          title: 'Scala',
          text: 'Ably SDK for Scala.',
          image: { src: scala, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-java',
          setupLink: '/getting-started/setup?lang=java',
        },
      ],
    },
    spaces: {
      text: "Choose from the following list of SDKs to add collaborative features to an application using the Spaces product. Click 'Setup' for instructions on getting started with an SDK, or view its source repository for a full list of the platforms it supports.",
      cards: [
        {
          title: 'JavaScript',
          text: 'Ably Spaces SDK for JavaScript.',
          image: { src: js, isWide: false },
          githubRepoURL: 'https://github.com/ably/spaces',
          setupLink: '/spaces/setup',
        },
        {
          title: 'React',
          text: 'Ably Spaces React Hooks package.',
          image: { src: react, isWide: false },
          githubRepoURL: 'https://github.com/ably/spaces',
          setupLink: '/spaces/react',
        },
      ],
    },
    chat: {
      text: "Choose from the following list of SDKs to add chat functionality to an application using the Chat product. Click 'Setup' for instructions on getting started with Chat, or view its source repository for a full list of the platforms it supports.",
      cards: [
        {
          title: 'JavaScript',
          text: 'Ably Chat SDK for JavaScript.',
          image: { src: js, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-chat-js',
          setupLink: '/chat/setup?lang=javascript',
        },
        {
          title: 'React',
          text: 'Ably Chat React Hooks package.',
          image: { src: react, isWide: false },
          githubRepoURL: 'https://github.com/ably/ably-chat-js',
          setupLink: '/chat/setup?lang=react',
        },
      ],
    },
  },
};
