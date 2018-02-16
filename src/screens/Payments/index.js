import { STRIPE_PK } from 'react-native-dotenv'
import React from 'react';
import { DangerZone } from 'expo';

import { View, Button } from 'react-native'

const payments = DangerZone.Payments;

payments.initialize({
    publishableKey: STRIPE_PK // Your Stripe publishable key
})

const addCard = async () => {
    const token = await payments.paymentRequestWithCardFormAsync({})
}

const Payments = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button onPress={() => addCard()} title='add card' />
    </View>
)

export default Payments;