import React from 'react';
import moment from 'moment';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { secondsToHMS } from '../../../../../utils/common-function';
import logo from '../../../../../assets/images/logo-large.png'; // Import the logo

const styles = StyleSheet.create({
    page: {
        padding: 20,
        borderTopWidth: 8,
        borderTopColor: '#F4D06F',
        borderBottomWidth: 8,
        borderBottomColor: '#F4D06F',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4',
    },
    logo: {
        width: 150, // Set the width for the logo
        height: 'auto', // Maintain aspect ratio
    },
    invoiceDetails: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    horizontalLine: {
        marginVertical: 10,
        height: 1,
        backgroundColor: '#E4E4E4',
    },
    customerInfo: {
        flexDirection: 'row', // Align "Bill To" and name on the same line
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    customerDetails: {
        flex: 1,
        marginLeft: 10, // Added margin to separate "Bill To" and the details
    },
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F9F9F9',
        padding: 10,
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4',
    },
    column: {
        width: '30%',
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    text: {
        fontSize: 12,
    },
    footer: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 10,
        color: '#666',
    },
});

const InvoicePdf = ({ data, type }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    {/* Add the logo image */}
                    <Image src={logo} style={styles.logo} />
                    <View style={styles.invoiceDetails}>
                        <Text>Tax Invoice</Text>
                        <Text>{data?.createdAt ? moment(data?.createdAt).format('DD MMM YY') : 'N/A'}</Text>
                        <Text><b>Transaction ID:</b> {data?.transactionId}</Text>
                    </View>
                </View>

                {/* Customer Information */}
                <View style={styles.customerInfo}>
                    <Text style={styles.sectionTitle}>Bill To:</Text>
                    <View style={styles.customerDetails}>
                        <Text style={styles.text}>{data?.customerId?.customerName}</Text>
                        <Text style={styles.text}>{data?.customerId?.email}</Text>
                    </View>
                </View>

                {/* Astrologer Information */}
                <View style={styles.customerInfo}>
                    <Text style={styles.sectionTitle}>Astrologer:</Text>
                    <View style={styles.customerDetails}>
                        <Text style={styles.text}>{data?.astrologerId?.astrologerName}</Text>
                    </View>
                </View>

                {/* Table Header */}
                <View style={styles.rowHeader}>
                    <Text style={[styles.column, styles.textBold]}>Description</Text>
                    <Text style={[styles.column, styles.textBold]}>Duration (hh:mm:ss)</Text>
                    <Text style={[styles.column, styles.textBold]}>Price/min</Text>
                    <Text style={[styles.column, styles.textBold]}>Total Price</Text>
                </View>

                {/* Table Content */}
                <View style={styles.row}>
                    <Text style={[styles.column, styles.textBold]}>{type}</Text>
                    <Text style={[styles.column, styles.textBold]}>{secondsToHMS(data?.duration)}</Text>
                    <Text style={[styles.column, styles.textBold]}>Rs. {data?.chargePerMinutePrice ? Number(data?.chargePerMinutePrice).toFixed(2) : 'N/A'}</Text>
                    <Text style={[styles.column, styles.textBold]}>Rs. {data?.totalPrice ? Number(data?.totalPrice).toFixed(2) : 'N/A'}</Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>If you have any concerns, please connect with our Customer Support via Website or Mobile Application.</Text>
                    <Text>We will be glad to assist you!</Text>
                    <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Thank You!</Text>
                    {/* <View style={styles.horizontalLine} /> */}
                    {/* <Text>Registered Address: Navaratri Enterprises</Text>
                    <Text>GSTIN: 05AATFN2979AIZ2</Text>
                    <Text>This is a computer-generated invoice. No signature required.</Text> */}
                </View>
            </Page>
        </Document>
    );
};

export default InvoicePdf;