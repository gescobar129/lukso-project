import React, { useState, useEffect } from 'react'
import { View, Animated, Image as StaticImage, Text } from 'react-native'


const Image = Animated.Image

const randomAnimationState = () => {
	const animations = ['eat1', 'walking', 'sleeping', 'jumping', 'walking', 'walking', 'walking', 'walking', 'walking', 'walking']
	return animations[Math.floor(Math.random() * animations.length)];
}

const MonsterImage = (animation: string, position: Animated.ValueXY, rotateX: any) => {

	const styles =
		{ transform: [{ translateX: position.x }, { translateY: position.y }, { rotateY: rotateX.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] }) }], marginBottom: 20 }


	switch (animation) {
		case 'eat1':
			return <Image style={styles} source={require('./assets/mon-assets/eat1.gif')} />
		case 'walking':
			return <Image style={styles} source={require('./assets/mon-assets/walking.gif')} />
		case 'sleeping':
			return <Image style={styles} source={require('./assets/mon-assets/sleeping.gif')} />
		case 'jumping':
			return <Image style={styles} source={require('./assets/mon-assets/jumping.gif')} />
	}
}

function randomizeInteger(min: number, max: number) {
	if (max == null) {
		max = (min == null ? Number.MAX_SAFE_INTEGER : min);
		min = 0;
	}

	min = Math.ceil(min);  // inclusive min
	max = Math.floor(max); // exclusive max

	if (min > max - 1) {
		throw new Error("Incorrect arguments.");
	}

	return min + Math.floor((max - min) * Math.random());
}

const Monster = () => {
	const [animationState, setAnimationState] = useState('sleeping')
	const position = new Animated.ValueXY({ x: 50, y: 0 })
	const rotatex = new Animated.Value(0)



	let walkingInterval: null | NodeJS.Timer = null

	useEffect(() => {
		setInterval(() => {
			setAnimationState(randomAnimationState())
		}, 10000)
	}, [])

	useEffect(() => {
		if (animationState === 'walking') {
			walkingInterval = setInterval(() => {
				let xval = randomizeInteger(-50, 50)


				if (xval > 0) {
					Animated.timing(rotatex, { toValue: 1, useNativeDriver: true, duration: 0 }).start()
				}

				if (xval < 0) {
					Animated.timing(rotatex, { toValue: 0, useNativeDriver: true, duration: 0 }).start()
				}


				// Animated.spring(position, { toValue: { x: 10, y: 10 } }).start()
				Animated.timing(position.x, { toValue: xval, useNativeDriver: true, duration: 500 }).start()
				Animated.timing(position.y, { toValue: randomizeInteger(-50, 50), useNativeDriver: true, duration: 500 }).start()

			}, 1000)

			setTimeout(() => {
				if (walkingInterval)
					clearInterval(walkingInterval)
			}, 9300)
		}
	}, [animationState])



	return (<View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
		<View style={{ position: 'absolute', top: 0, left: 20, alignItems: 'flex-start', justifyContent: 'center' }}>
			<Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: -30 }}>LukMon #1209</Text>
			<StaticImage style={{ marginLeft: -18 }} source={require('./assets/Heart.png')} />
		</View>
		{/* <ImageBackground
			source={{ uri: 'https://images.squarespace-cdn.com/content/v1/551a19f8e4b0e8322a93850a/1578073533699-9K4UGL9JEKD9E9ZH3E9T/image-asset.gif?format=500w', width, height }}
			style={{ width: '100%', height: '100%' }}
		> */}
		{MonsterImage(animationState, position, rotatex)}
		{/* </ImageBackground> */}

	</ View>)
}

export default Monster