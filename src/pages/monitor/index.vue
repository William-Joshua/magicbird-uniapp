<template>
    <view>
        <view class="fixed">
            <cu-custom bgColor="bg-gradual-blue" :isBack="true">
                <block slot="backText">返回</block>
                <block slot="content">卡片</block>
            </cu-custom>
        </view>
        <swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
            duration="500">
            <image :src="'/static/images/title/devicetitle.svg'" mode="aspectFill"></image>
        </swiper>
        <view class="cu-bar bg-white solid-bottom">
            <view class="action">
                <text class="cuIcon-titles text-orange"></text> 播放设置 ： auto
            </view>
            <view class="action">
                <switch :class="isCard ? 'checked' : ''" :checked="isCard ? true : false" @change="IsCard"></switch>
            </view>
        </view>
        <view class="cu-card case" :class="isCard ? 'no-card' : ''">
            <view class="cu-item shadow">
                <view class="image">
                    <image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="widthFix">
                    </image>
                    <view class="cu-tag bg-blue">高清</view>
                    <view class="cu-bar bg-shadeBottom"></view>
                </view>
                <view class="cu-list menu-avatar">
                    <view class="cu-item">
                        <view class="cu-avatar round lg"
                            style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
                        </view>
                        <view class="content flex-sub">
                            <view class="text-grey">监控编号 ： 1</view>
                            <view class="text-gray text-sm flex justify-between">
                                位置 ： xxxx
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

                <view class="cu-card case" :class="isCard ? 'no-card' : ''">
            <view class="cu-item shadow">
                <view class="image">
                    <image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="widthFix">
                    </image>
                    <view class="cu-tag bg-blue">高清</view>
                    <view class="cu-bar bg-shadeBottom"></view>
                </view>
                <view class="cu-list menu-avatar">
                    <view class="cu-item">
                        <view class="cu-avatar round lg"
                            style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
                        </view>
                        <view class="content flex-sub">
                            <view class="text-grey">监控编号 ： 1</view>
                            <view class="text-gray text-sm flex justify-between">
                                位置 ： xxxx
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            isCard: false
        };
    },
    methods: {
        IsCard(e) {
            this.isCard = e.detail.value
        },
    }
}
</script>

<style>
</style>
