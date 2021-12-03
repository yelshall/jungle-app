import {
	Dimensions,
	Text,
	ImageBackground,
	Image,
	TouchableOpacity,
	View
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Icon } from "react-native-elements";
import { Flex, Spacer, Stack, IconButton } from 'native-base';
import { LinearGradient } from "expo-linear-gradient";
import Carousel from 'react-native-snap-carousel';

var { height, width } = Dimensions.get("window");

const itemWidth = width * 0.67;
const itemHeight = height / 2 - Constants.statusBarHeight * 2;

export const CardItem = ({ event, onPress }) => (
	<TouchableOpacity
		activeOpacity={0.8}
		onPress={onPress}
		key={event._id}
		style={{
			alignItems: 'center'
		}}
	>
		<Flex
			style={{
				flexDirection: 'column',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '2%',
				backgroundColor: 'white',
				marginVertical: '1%'
			}}
		>
			<Image
				source={{ uri: event.imageURL }}
				style={{
					height: 150,
					width: 325,
					opacity: 1,
					resizeMode: "cover",
					borderRadius: 5,
					borderColor: '#e3e3e3',
					borderWidth: 0.5
				}}
			/>
			<Spacer />
			<Stack direction={'column'} style={{ width: '93%', justifyContent: 'space-between' }}>
				<Text style={{ fontWeight: 'bold', fontSize: 16, margin: 5 }}>{event.eventName.length > 28 ?
					event.eventName.substring(0, 28) + '...' : event.eventName}</Text>
				<Flex>
					<Flex
						style={{
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>
						<Icon
							type={"ionicon"}
							name={"location-outline"}
							size={14}
							containerStyle={{
								marginRight: '1%'
							}}
						/>
						<Text>{event.location.length > 30 ? event.location.substring(0, 30) + '...' : event.location}</Text>
					</Flex>
					<Flex
						style={{
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>
						<Icon
							type={"ionicon"}
							name={"calendar-outline"}
							size={14}
							containerStyle={{
								marginRight: '1%'
							}}
						/>
						<Text>{(new Date(event.dateTime)).toDateString()}</Text>
					</Flex>
				</Flex>
			</Stack>
		</Flex>
	</TouchableOpacity>
);

export const CardRow = ({ event, onPress }) => (
	<TouchableOpacity
		onPress={onPress}
		activeOpacity={1}
	>
		<ImageBackground
			source={{ uri: event.imageURL }}
			style={{
				height: itemHeight,
				width: itemWidth,
				opacity: 1,
				resizeMode: "cover",
				justifyContent: 'flex-end'
			}}
		>
			<LinearGradient
				colors={['#000000', 'transparent', 'transparent']}
				start={{ x: 0, y: 0.9 }}
				end={{ x: 0, y: 0 }}
				style={{
					height: '100%',
					width: '100%',
					justifyContent: 'flex-end'
				}}
			>
				<Stack direction={'column'} style={{ width: '100%', margin: '3%' }}>
					<Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white' }}>{event.eventName.length > 18 ?
						event.eventName.substring(0, 18) + '...' : event.eventName}</Text>
					<Flex>
						<Flex
							style={{
								flexDirection: 'row'
							}}
						>
							<Icon
								type={"ionicon"}
								name={"location-outline"}
								size={16}
								containerStyle={{
									marginRight: '1%'
								}}
								color={"white"}
							/>
							<Text style={{ fontSize: 16, color: 'white' }}>{event.location.length > 25 ? event.location.substring(0, 25) + '...' : event.location}</Text>
						</Flex>
						<Flex
							style={{
								flexDirection: 'row'
							}}
						>
							<Icon
								type={"ionicon"}
								name={"calendar-outline"}
								size={14}
								containerStyle={{
									marginRight: '1%'
								}}
								color={'white'}
							/>
							<Text style={{ fontSize: 16, color: 'white' }}>{(new Date(event.dateTime)).toDateString()}</Text>
						</Flex>
					</Flex>
				</Stack>
			</LinearGradient>
		</ImageBackground>
	</TouchableOpacity>
);

export const EventsRow = ({title, data, renderItem, onMore}) => {
	return (
		<View style={{
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'center',
			height: 280,
			backgroundColor: 'white',
			borderTopWidth: 0.5,
			borderBottomWidth: 0.5,
			borderColor: '#e3e3e3',
			margin: 5
		}}>
			<View
				style={{
					flexDirection: 'row',
					width: width,
					alignItems: 'center'
				}}
			>
				<Text
					style={{
						fontSize: 22,
						fontWeight: "600",
						alignSelf: "flex-start",
						paddingHorizontal: 10,
						paddingVertical: 10
					}}

				>
					{title}
				</Text>
				<IconButton
					icon={<Icon
						name={'arrow-forward-outline'}
						type={'ionicon'}
						color={'#5e5e5e'}
						size={16}
					/>}
					w={8}
					h={8}
					bg={'#f0f0f0'}
					borderRadius={'full'}
					colorScheme={'green'}
					onPress={onMore}
				/>
			</View>
			<Carousel
				layout={"default"}
				data={data}
				sliderWidth={width}
				itemWidth={350}
				inactiveSlideScale={1}
				inactiveSlideOpacity={1}
				activeSlideAlignment={'center'}
				renderItem={renderItem}
			/>
		</View>
	);
};